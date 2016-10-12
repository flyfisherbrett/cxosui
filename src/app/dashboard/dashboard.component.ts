import { Component, OnInit } from '@angular/core';
import { UserService, User, Company } from '../user/user.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

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

    constructor(private userService: UserService, private router: Router, private dashboardService: DashboardService) {
      if (!this.userService.isLoggedIn()) {
        this.router.navigate(['/']);
      }

      this.user = this.userService.getUser();
      this.company = this.userService.getCompany();

      this.userService.companySwitch.subscribe(c => {
        this.company = c;
        this.setData();
      });
    }

    ngOnInit() {
      this.setData();
    }

    setData() {
      this.dashboardService.getChartData(this.company.id).subscribe(res => {
        this.data = res.json().data;
      });
    }
}
