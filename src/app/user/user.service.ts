import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';


export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Company {
  id: number;
  name: string;
  employee_id: number;
  role: string;
} // defining Company interface for Typescript; not required

@Injectable()
export class UserService {
  loggedIn = new Subject<Boolean>();
  companySwitch = new Subject<Company>(); 
  // anything subscribed will now know the attributes because of the 'Company' type;
  // must define the interface first to use this type, this was previously set to 'Object'
  // before Company interface was defined;

  constructor(private http: Http, private router: Router) {
    this.loggedIn.next(false); // when service is instantiated, loggedIn value is false
  }

  login(email, password) {
    let creds = { email: email, password: password };

    this.http.post(environment.apiEndpoint + 'api/sessions', creds)
      .subscribe(
      res => {
        this.loadSessionData(res.json());
        this.loggedIn.next(true);
        this.router.navigate(['cash_flow']);
      }, err => {
        console.log(err);
        alert(err.json().messages);
      }
      );
  }

  loadSessionData(data) {
    localStorage.setItem('user', JSON.stringify(data.user));
    let companies = this.processCompanyRoles(data.companies, data.employees);
    localStorage.setItem('companies', JSON.stringify(companies));
    if (!this.sameUser(this.getCompany(), companies)) { this.changeCompany(companies[0]); }
  }

  sameUser(company, companies) {
    let found = companies.filter(c => {
      return (c.name === company.name) && (c.employee_id === company.employee_id);
    });
    return found.length === 1;
  }

  changeCompany(company: Company) {
    localStorage.setItem('company', JSON.stringify(company));
    this.companySwitch.next(company);
  }

  logout() {
    localStorage.removeItem('companies');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getCompanies() {
    let comps = JSON.parse(localStorage.getItem('companies'));
    if (comps) {
      return JSON.parse(localStorage.getItem('companies')).sort((a, b) => {
        return ((a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0)); // sort companies by name
      });
    }
  }

  getCompany() {
    return JSON.parse(localStorage.getItem('company'));
  }

  setCompany(id) {
    let company = this.getCompanies().find(c => { return c.id === id; });
    localStorage.setItem('company', JSON.stringify(company));
    this.companySwitch.next(company);
  }

  processCompanyRoles(companies, employees) {
    return companies.map(c => {
      let employee = employees.find(e => {
        return e.company_id === c.id;
      });
      c.employee_id = employee.id;
      c.role = employee.role;
      return c;
    });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn() {
    return !!this.getUser();
  }

  headerToken() {
    if (this.isLoggedIn()) {
      return 'Bearer ' + this.getUser().access_token;
    }
  }
}
