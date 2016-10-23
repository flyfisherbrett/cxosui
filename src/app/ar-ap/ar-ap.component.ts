import { Component, Input, OnChanges } from '@angular/core';
import { SessionService } from '../session/session.service';
import { ArApService } from './ar-ap.service';
import { Company } from '../company';
import { DashboardService } from '../dashboard/dashboard.service';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ar-ap',
    templateUrl: 'ar-ap.component.html',
    styleUrls: ['ar-ap.component.css'],
    providers: [ArApService]
})

export class ArApComponent{
    @Input() cash: any;
    @Input() company: Company;
    customers = [];
    vendors = [];
    apTotal = 0;
    arTotal = 0;
    currentBalance: Number;
    oneWeekBalance: Number;

    constructor(
      private arAp: ArApService,
      private dashboardService: DashboardService,
      private errorService: ErrorService,
      private router: Router,
      private sessionService: SessionService)
      {
        this.init();
    }

    init(){
      this.getCash();

      if(this.company){
        this.getAR(this.company.id);
        this.getAP(this.company.id);
      }
    }

    ngOnChanges() {
      this.init()
    }

    getCash(){
      if(this.cash) {
        this.currentBalance = this.cash.actual[this.cash.actual.length - 1][1];
        this.oneWeekBalance = this.cash.total.data[6][1];
      }
    }

    getAR(id){
      this.arAp.getReportData(id, 'AgedReceivables').subscribe(res => {
        let response = res.json().data.resources;

        this.customers = response.map(obj => {
          let customer = { name: '', balance: 0 };
          customer.name = obj.name;
          customer.balance = obj.Total;
          return customer;
        });
        
        this.arTotal = this.customers.reduce((memo, cus) => {
          return memo + parseFloat(cus.balance);
        }, 0);
      }, err => {
        this.errorService.handle(err);
      });
    }

    getAP(id) {
      this.arAp.getReportData(id, 'AgedPayables').subscribe(res => {
        let response = res.json().data.resources;

        this.vendors = response.map(obj => {
          let vendor = { name: '', balance: 0 };
          vendor.name = obj.name;
          vendor.balance = obj.Total;
          return vendor;
        });

        this.apTotal = this.vendors.reduce((memo, ven) => {
          return memo + parseFloat(ven.balance);
        }, 0);
      }, err => {
        this.errorService.handle(err);
      });
    }

}
