import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Company } from './interfaces/company.interface';
import { User } from './interfaces/user.interface';
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
  isHome: boolean = false;

  constructor(private sessionService: SessionService, private router: Router, private modalService: ModalService) {
    this.router.events
      .subscribe((event: NavigationEnd) => {
        if (event instanceof NavigationEnd) {
          this.isHome = event.url === '/';
        }
      });

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

  setCompany(id) {
    this.sessionService.setCompany(id);
  }

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
    $(window).trigger('resize');
  }

  logout() { this.sessionService.logout(); }

  showAddCompanyModal() {
    $('#modal-add-company').openModal();
  }
}
