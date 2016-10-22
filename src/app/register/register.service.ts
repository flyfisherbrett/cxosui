import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {
  
  constructor (private http: Http){}

  create (user, subscription) {
    let subscriptionParams = { user: user, subscription: subscription };
    return this.http.post(environment.apiEndpoint + 'api/subscriptions', subscriptionParams);
  }
}
