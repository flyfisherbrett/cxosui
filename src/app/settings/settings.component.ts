import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { SettingsService } from './settings.service';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';
import { Company } from '../company';
import { User } from '../user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService] // declared here as it only services this component
})
export class SettingsComponent implements OnInit {
  user: User;
  company: Company;
  codes = [1,2];

  constructor(private sessionService: SessionService,
              private router: Router,
              private settingsService: SettingsService,
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

    show() {
      this.settingsService.show(this.company.id).subscribe(res => {
        console.log(res.json());
      }, err => {
        this.errorService.handle(err);
      });
    }
}
