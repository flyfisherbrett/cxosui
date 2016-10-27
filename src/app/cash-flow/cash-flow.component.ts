import { Component, Input, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core'; // animation requirements
import { ModalService } from '../modal/modal.service';
declare var $;

@Component({
    selector: 'app-cash-flow',
    templateUrl: './cash-flow.component.html',
    styleUrls: ['./cash-flow.component.css'],
    animations: [
        trigger('expandedState', [
            state('expanded', style({
                height: '600px'
            })),
            state('contracted', style({
                height: '350px'
            })),
            transition('contracted => expanded', animate('100ms ease-in')),
            transition('expanded => contracted', animate('100ms ease-out'))
        ])
    ]
})

export class CashFlowComponent implements OnChanges {
    @Input() company: {};
    @Input() data: any;
    expansion = 'contracted';
    bills = [];
    invoices = [];
    projection = [];
    flags = [];
    plan = [];

    constructor(private modalService: ModalService) { }

    ngOnChanges() {
        if (this.data) {
            this.prepareCashFlowData();
        }
    }

    generateFlags() {
        let allModifiers = this.bills.concat(this.invoices);
        let flags = allModifiers.reduce((coll, m) => {
            if (!this.withinProjection(m.date) || !m.include) { return coll; }
            coll.push({
                description: m.description + this.monetize(m.total),
                title: m.type,
                x: Date.parse(m.date)
            });
            return coll;
        }, []);
        return flags.sort((a, b) => {
            if (a.x > b.x) { return 1; }
            if (a.x < b.x) { return -1; }
            return 0;
        });
    }

    monetize(num) {
        return ': $' + num.toFixed(2);
    }

    prepareCashFlowData() {
        this.projection = this.createBaseProjection();
        this.invoices = this.mapIncome(this.data.income);
        this.bills = this.mapExpenses(this.data.expenses);
        this.createProjection();
    }

    mapIncome(income) {
        let results = income.map(i => {
            i.include = this.withinProjection(i.date);
            return {
                customer_name: i.customer_name,
                date: i.date,
                description: i.description,
                due_in_days: i.due_in_days,
                id: i.id,
                include: this.withinProjection(i.date),
                total: i.total,
                type: i.type
            };
        });
        return this.sortModifiers(results);
    }

    mapExpenses(expenses) {
        let results = expenses.map(i => {
            i.include = this.withinProjection(i.date);
            return {
                vendor: i.vendor,
                date: i.date,
                description: i.description,
                due_in_days: i.due_in_days,
                id: i.id,
                include: this.withinProjection(i.date),
                total: i.total,
                type: i.type
            };
        });
        return this.sortModifiers(results);
    }

    withinProjection(date) {
        let milli = Date.parse(date);
        return milli >= this.projection[0][0] && milli <= this.projection[this.projection.length - 1][0];
    }

    createProjection() {
        this.flags = this.generateFlags();
        this.projection = this.modifyProjection(this.projection);
    }

    createBaseProjection() {
        let start = this.data.actual[this.data.actual.length - 1];
        let coll = [];
        let milliDate = 0;
        for (let _i = 0; _i < 31; _i++) {
            coll.push([(start[0] + milliDate), start[1]]);
            milliDate += 86400000;
        }
        return coll;
    }

    modifyProjection(projection) {
        if (!projection[0]) { return; }
        let currentBalance = projection[0][1];
        let modifiers = this.createProjectionModifiers();
        let newProjection = projection.reduce((coll, p) => {
            let adjustment = modifiers.find(mod => { return mod.date === p[0]; });
            if (adjustment) { currentBalance = currentBalance + adjustment.total; }
            coll.push([p[0], currentBalance]);
            return coll;
        }, []);
        return newProjection;
    }

    createProjectionModifiers() {
        let debtModifiers = this.bills.map(b => {
            return {
                date: Date.parse(b.date),
                total: b.total * -1,
                include: b.include
            };
        });
        let incomeModifiers = this.invoices.map(i => {
            return {
                date: Date.parse(i.date),
                total: i.total,
                include: i.include
            };
        });
        let allModifiers = incomeModifiers.concat(debtModifiers);
        let reducedModifiers = allModifiers.reduce((coll, mod) => {
            if (!mod.include) { return coll; }
            let match = coll.find(e => { return e.date === mod.date; });
            if (match) {
                match.total = match.total + mod.total;
            } else {
                coll.push(mod);
            }
            return coll;
        }, []);
        return this.sortModifiers(reducedModifiers);
    }

    sortModifiers(mods) {
        return mods.sort((a, b) => {
            if (a.date > b.date) { return 1; }
            if (a.date < b.date) { return -1; }
            return 0;
        })
    }

    expand(e) {
        e.preventDefault();
        this.expansion = 'expanded';
    }

    contract(e) {
        e.preventDefault();
        this.expansion = 'contracted';
    }

    showPlan(e) {
        this.plan = this.transactionsByDate();
        $('#modal-plan').openModal();
    }

    transactionsByDate() {
        let debts = this.bills.filter(e => { return e.include === true; });
        let income = this.invoices.filter(e => { return e.include === true; });
        let groupedTransactions = debts.reduce( (coll, t) => {
            let instruction = 'Pay $' + t.total + ' to ' + t.vendor;
            if (coll[t.date]) {
                coll[t.date].push(instruction);
            } else {
                coll[t.date] = [instruction];
            }
            return coll;
        }, {});
        groupedTransactions = income.reduce( (coll, t) => {
            let instruction = 'Collect $' + t.total + ' from ' + t.customer_name;
            if (coll[t.date]) {
                coll[t.date].push(instruction);
            } else {
                coll[t.date] = [instruction];
            }
            return coll;
        }, groupedTransactions);
        let dates = Object.keys(groupedTransactions);
        return this.sortModifiers(dates.map(d => {
            return {
                date: d,
                instructions: groupedTransactions[d]
            };
        }));
    }

    print() {
        let content = $('#print-content').html();
        console.log(content);
        let popupWinindow = window.open(
            '', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write(
            '<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head>' +
            content +
            '</html>');
        popupWinindow.document.close();
    }

    today() {
        let today = new Date();
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    }

    setPicker(e) {
        console.log(e);
    }
}

// <body onload="window.print()/>"