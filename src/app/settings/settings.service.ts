import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class SettingsService {
  constructor (private http: Http, private sessionService: SessionService) {}

  show(companyId, employeeId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return // settings shit

  }

}
