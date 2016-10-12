import { Component } from '@angular/core';
import { UserService, Company, User } from './user/user.service';


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


  constructor(private userService: UserService) {
    if (this.userService.isLoggedIn()) {
      this.user = this.userService.getUser() || {};
      this.companies = this.userService.getCompanies();
      this.company = this.userService.getCompany();
    }

    this.userService.companySwitch.subscribe(c => {
      this.company = c;
    });

    this.userService.loggedIn.subscribe( loggedIn => {
      if (loggedIn) {
        this.user = this.userService.getUser();
        this.companies = this.userService.getCompanies();
        this.company = this.userService.getCompany();
      } else {
        this.user = null;
        this.companies = [];
        this.company = null;
      }
    });
  }

  setCompany(id) {
    this.userService.setCompany(id);
  }

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  logout() { this.userService.logout(); }
}
