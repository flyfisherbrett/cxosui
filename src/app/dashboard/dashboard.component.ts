import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
import { Company } from '../company';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService] // declared here as it only services this component
})
export class DashboardComponent implements OnInit {
  user: User;
  company: Company;
  data: any;

  constructor(private sessionService: SessionService,
    private router: Router,
    private dashboardService: DashboardService,
    private errorService: ErrorService) {

    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.user = this.sessionService.getUser();
    this.company = this.sessionService.getCompany();
    this.checkUserRole();

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
      this.checkUserRole();
      this.getCashFlowData();
    });
  }

  ngOnInit() {
    this.getCashFlowData();
  }

  getCashFlowData() {
    this.dashboardService.cashFlow(this.company.id)
      .subscribe(res => {
        this.data = res.json().data;
      }, err => {
        this.errorService.handle(err);
      });
  }

  checkUserRole() {
    if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
  }
}
