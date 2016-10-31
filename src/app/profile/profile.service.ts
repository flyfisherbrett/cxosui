import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class ProfileService {
  constructor(private http: Http, private sessionService: SessionService) { }

  index(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId + '/employees', { headers: headers });
  }

  show(companyId, employeeId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/employees/' + employeeId, { headers: headers });
  }

  updateProfile(employeeId, employeeParams) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.put(environment.apiEndpoint + 'api/employees/' + employeeId, employeeParams, { headers: headers });
  }

  updatePassword(oldVal, newVal, confirmVal, employeeId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    let params = {
      current_password: oldVal,
      password: newVal,
      password_confirmation: confirmVal,
      employee_id: employeeId
    };
    return this.http.post(environment.apiEndpoint + 'api/passwords/update_password', params, { headers: headers });
  }

  profilePicture(userId, file) {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', environment.apiEndpoint + 'api/users/' + userId + '/set_profile_pic', true);
      xhr.setRequestHeader('Authorization', this.sessionService.headerToken());

      let formData = new FormData();
      formData.append('file', file, file.name);
      xhr.send(formData);
    });
  }

}
