import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class BenchmarksService {
  constructor (private http: Http, private sessionService: SessionService) {}

  companyShow(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId, {headers: headers});
  }

  companyReports(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId + '/reports', {headers: headers});
  }

  benchmarkData(industryCode) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/industry_benchmarks/' + industryCode, {headers: headers});
  }

}
