import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class ProfileService {
  constructor (private http: Http, private sessionService: SessionService) {}

  index (companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId + '/employees', {headers: headers});
  }

  show(companyId, employeeId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/employees/' + employeeId, {headers: headers});
  }

}
