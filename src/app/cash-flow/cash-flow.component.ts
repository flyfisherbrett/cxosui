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

    ngOnChanges() {
        if (this.data) {
            let invoices = this.data.flags.filter(f => { return f.title === 'Invoice'; });
            let bills = this.data.flags.filter(f => { return f.title === 'Bill'; });
            this.invoices = this.processFlags(invoices);
            this.bills = this.processFlags(bills);
        }
    }

    processFlags(coll) {
        return coll.map(c => {
            let date = new Date(c.x);
            return {
                name: c.description,
                id: 1, amount: 123.45,
                include: true,
                date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            };
        });
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
