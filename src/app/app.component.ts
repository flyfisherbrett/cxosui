import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { Router } from '@angular/router';
import { Company } from './company';
import { User } from './user';
import { ModalService } from './modal/modal.service';
declare var $;

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
  loggedIn: boolean;


  constructor(private sessionService: SessionService, private router: Router, private modalService: ModalService) {
    if (this.sessionService.isLoggedIn()) {
      this.user = this.sessionService.getUser() || {};
      this.companies = this.sessionService.getCompanies();
      this.company = this.sessionService.getCompany();
      this.loggedIn = true;
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
        this.loggedIn = true;
      } else {
        this.user = null;
        this.companies = [];
        this.company = null;
        this.sideNavExpanded = false;
        this.loggedIn = false;
      }
    });
  }

  openModal(header, body, buttons) {
    this.modalService.openModal('one thing',
                                '<h1>another</h1>', null);
  }

  setCompany(id) {
    this.sessionService.setCompany(id);
  }

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  logout() { this.sessionService.logout(); }
}
