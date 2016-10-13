import { Component } from '@angular/core';
import { SessionService, Company, User } from './session/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  sideNavExpanded = true;
  user: User;
  companies: Array<Company>;
  company: Company;


  constructor(private sessionService: SessionService, private router: Router) {
    if (this.sessionService.isLoggedIn()) {
      this.user = this.sessionService.getUser() || {};
      this.companies = this.sessionService.getCompanies();
      this.company = this.sessionService.getCompany();
    }

    this.router.events.subscribe(event => {
      if (event.url === '/') {this.sideNavExpanded = false; };
    });

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
    });

    this.sessionService.loggedIn.subscribe( loggedIn => {
      if (loggedIn) {
        this.sideNavExpanded = true;
        this.user = this.sessionService.getUser();
        this.companies = this.sessionService.getCompanies();
        this.company = this.sessionService.getCompany();
      } else {
        this.user = null;
        this.companies = [];
        this.company = null;
        this.sideNavExpanded = false;
      }
    });
  }

  setCompany(id) {
    this.sessionService.setCompany(id);
  }

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  logout() { this.sessionService.logout(); }
}
