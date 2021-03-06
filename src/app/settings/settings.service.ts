import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class SettingsService {
  constructor(private http: Http, private sessionService: SessionService) { }

  show(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId, { headers: headers });
  }

  createSystemUser(companyId, user) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.post(
      environment.apiEndpoint + 'api/companies/' + companyId + '/employees/admin_employee',
      user,
      { headers: headers });
  }

  saveCode(companyId, code) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.put(
      environment.apiEndpoint + 'api/companies/' + companyId,
      {naics: 'thisisdumb:' + code},
      { headers: headers });
  }

}
