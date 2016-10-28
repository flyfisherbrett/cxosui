import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class ForgotPasswordService {

  constructor (private http: Http, private sessionService: SessionService, private errorService: ErrorService) {}

  forgotPassword (email) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.post(environment.apiEndpoint + 'api/passwords/forgot_password', {email: email}, {headers: headers});
  }

}
