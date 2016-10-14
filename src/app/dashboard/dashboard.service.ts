import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class DashboardService {
  data: Object;

  constructor (private http: Http, private sessionService: SessionService, private errorService: ErrorService) {}

  cashFlow (id) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    headers.append('report_type', 'CashFlow');

    return this.http.get(environment.apiEndpoint + 'api/companies/' + id + '/cash_flow', {headers: headers});

  }

  getData() { return this.data; }

}
