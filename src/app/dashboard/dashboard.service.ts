import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable()
export class DashboardService {
  constructor (private http: Http, private userService: UserService) {}

  getChartData (id) {
    let headers = new Headers();
    headers.append('Authorization', this.userService.headerToken());
    headers.append('report_type', 'CashFlow');
    return this.http.get(environment.apiEndpoint + 'api/companies/' + id + '/cash_flow', {headers: headers});
  }

}
