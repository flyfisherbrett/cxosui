import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Company } from '../company';
import { ModalService } from '../modal/modal.service';


@Injectable()
export class SessionService {
  loggedIn = new Subject<Boolean>();
  private _updateCompany = new Subject<Company>();
  companySwitch = this._updateCompany.asObservable();
  // anything subscribed will now know the attributes because of the 'Company' type;
  // must define the interface first to use this type, this was previously set to 'Object'
  // before Company interface was defined;

  apiSession = environment.apiEndpoint + 'api/sessions';

  constructor(private http: Http, private router: Router, private modalService: ModalService) {
    this.loggedIn.next(this.isLoggedIn()); // when service is instantiated, loggedIn value is detected
  }

  login(email, password) {
    let creds = { email: email, password: password };

    this.http.post(this.apiSession, creds)
      .subscribe(
      res => {
        this.loadSessionData(res.json());
        this.loggedIn.next(true);
        this.router.navigate(['cash_flow']);
      }, err => {
        this.modalService.openModal('Invalid Credentials',
                                    '<p>That Email and Password does not match our records.</p>',
                                    null);
      }
      );
  }

  createByToken(token) {
    let creds = { token: token};

    this.http.post(this.apiSession, creds)
      .subscribe(
      res => {
        this.loadSessionData(res.json());
        this.loggedIn.next(true);
        this.router.navigate(['cash_flow']);
      }, err => {
        this.modalService.openModal('Invalid Credentials',
                                    '<p>That Email and Password does not match our records.</p>',
                                    null);
      }
      );
  }

  loadSessionData(data) {
    this.loadUser(data);
    this.loadCompany(data);
  }

  loadUser(data) {
    localStorage.setItem('user', JSON.stringify(data.user));
    let companies = this.processCompanyRoles(data.companies, data.employees);
  }

  loadCompany(data) {
    let companies = this.processCompanyRoles(data.companies, data.employees);
    localStorage.setItem('companies', JSON.stringify(companies));
    if (!this.sameUser(this.getCompany(), companies)) { this.changeCompany(companies[0]); }
  }

  sameUser(company, companies) {
    if (company && companies) {
      let found = companies.filter(c => {
        return (c.name === company.name) && (c.employee_id === company.employee_id);
      });
      return found.length === 1;
    }
  }

  changeCompany(company: Company) {
    localStorage.setItem('company', JSON.stringify(company));
    this._updateCompany.next(company);
  }

  logout() {
    localStorage.removeItem('companies');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
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
    let company = localStorage.getItem('company');

    if (company != 'undefined') {
      return JSON.parse(company);
    } else  {
      return {};
    }
  }

  setCompany(id) {
    let company = this.getCompanies().find(c => { return c.id === id; });
    localStorage.setItem('company', JSON.stringify(company));
    this._updateCompany.next(company);
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
