import { Component, OnInit } from '@angular/core';
import { SessionService, User, Company } from '../session/session.service';
import { ProfileService } from './profile.service';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // declared here as it only services this component
})
export class ProfileComponent implements OnInit {
  user: User;
  company: Company;
  data: any;
  profile = {
    first_name: '',
    last_name: '',
    primary_email: '',
    secondary_email: '',
    title: '',
    role: '',
    pay_type: '',
    classification: '',
    picture: ''
  }

  constructor(private sessionService: SessionService,
              private router: Router,
              private profileService: ProfileService,
              private errorService: ErrorService) {

    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.user = this.sessionService.getUser();
    this.company = this.sessionService.getCompany();

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
      this.show();
    });
  }
    ngOnInit() {
      this.show();
    }

    buildProfile(data) {
      let user = data.employee.user;
      this.profile = {
        first_name: user.first_name,
        last_name: user.last_name,
        primary_email: user.email,
        secondary_email: user.secondary_email,
        title: data.employee.title,
        role: data.employee.role,
        pay_type: data.employee.pay_type,
        classification: data.employee.classification,
        picture: data.employee.user.attachment_url
      };
    }

    showPasswordChange(e) {
      e.preventDefault();
    }

    show() {
      this.profileService.show(this.company.id, this.company.employee_id).subscribe(res => {
        this.buildProfile(res.json());
      }, err => {
        this.errorService.handle(err);
      });
    }
}
