import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../session/session.service';

@Injectable()
export class AddCompanyService {
  endpoint = environment.apiEndpoint + 'api/sessions/1';

  constructor(private http: Http, private sessionService: SessionService) { }

  index() {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(this.endpoint, { headers: headers });
  }
}
