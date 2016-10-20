import { Component, Input, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core'; // animation requirements

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
}
