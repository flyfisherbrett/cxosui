import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session/session.service';

@Injectable()
export class BenchmarksService {
  constructor(private http: Http, private sessionService: SessionService) { }

  companyShow(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId, { headers: headers });
  }

  companyReports(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/companies/' + companyId + '/reports', { headers: headers });
  }

  benchmarkData(industryCode) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(environment.apiEndpoint + 'api/industry_benchmarks/' + industryCode, { headers: headers });
  }

  cash(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=balance_sheet_assets&slug=cash',
      { headers: headers });
  }

  receivables(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=balance_sheet_assets&slug=receivables',
      { headers: headers });
  }

  currentRatio(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=financial_ratios_cash_flow_solvency&slug=current_ratio',
      { headers: headers });
  }

  quickRatio(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=financial_ratios_cash_flow_solvency&slug=quick_ratio',
      { headers: headers });
  }

  assetTurnover(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=financial_ratios_turnover&slug=total_asset_turnover',
      { headers: headers });
  }

  returnOnAssets(companyId) {
    let headers = new Headers();
    headers.append('Authorization', this.sessionService.headerToken());
    return this.http.get(
      environment.apiEndpoint +
      'api/companies/' +
      companyId +
      '/account_entries?report_type=financial_ratios_profitability&slug=pre_tax_return_on_assets_percentage',
      { headers: headers });
  }
}

//   quickRatio(companyId) {
//     api/v1/:company_id/account_entries?report_type=financial_ratios_cash_flow_solvency&slug=quick_ratio
//   }

//   assetTurnover(companyId) {
//     api/v1/:company_id/account_entries?report_type=financial_ratios_turnover&slug=total_asset_turnover
//   }

//   returnOnAssets(companyId) {

//   }
// }


// api/v1/:company_id/account_entries?report_type=financial_ratios_profitability&slug=pre_tax_return_on_assets_percentage