import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { BenchmarksService } from './benchmarks.service';
import { Router } from '@angular/router';
import { Company } from '../company';
import { ErrorService } from '../error/error.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.css'],
  providers: [BenchmarksService] // declared here as it only services this component
})
export class BenchmarksComponent implements OnInit {
  company: Company;
  extendedCompany: Object;
  cashData = {};
  receivablesData = {};
  currentRatioData = {};
  quickRatioData = {};
  assetTurnoverData = {};
  returnOnAssetsData = {};

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private benchmarksService: BenchmarksService,
    private errorService: ErrorService,
    private modalService: ModalService) {
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.company = this.sessionService.getCompany();
    this.checkUserRole();

    this.sessionService.companySwitch.subscribe(c => {
        this.company = c;
        this.checkUserRole();
        this.getCompany();
    });
  }

  ngOnInit() {
    this.getCompany();
  }

  checkUserRole() {
    if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
  }

  noDataWarning() {
    this.modalService.openModal(
      'No Industry Data',
      `<p>Unable to display industry data becasue this company has no NAICS code.</p>
      <p>Please set and save an NAICS code for this company.</p>
      <h5 class>Redirecting you to the settings page.</h5>`,
      null);
  }

  getCompany() {
    this.benchmarksService.companyShow(this.company.id).subscribe(res => {
      this.extendedCompany = res.json().company;
      this.loadOrRedirect();
    }, err => {
      this.errorService.handle(err);
    });
  }

  loadOrRedirect() {
    if (!this.extendedCompany['naics_code'] && this.router.url === '/benchmarks') {
      this.noDataWarning();
      this.router.navigate(['/settings']);
    } else {
      this.populateBenchmarks();
    }
  }

  populateBenchmarks() {
    this.getCash();
    this.getReceivables();
    this.getCurrentRatio();
    this.getQuickRatio();
    this.getAssetTurnover();
    this.getReturnOnAssets();
  }

  getCash() {
    this.benchmarksService.cash(this.company.id).subscribe(res => {
      this.cashData = {
        title: 'Cash as % of Assets',
        graphData: res.json().data,
        description: 'this be cash'
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getReceivables() {
    this.benchmarksService.receivables(this.company.id).subscribe(res => {
      this.receivablesData = {
        title: 'Receivables as % of Assets',
        graphData: res.json().data,
        description: 'this be receivables'
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getCurrentRatio() {
    this.benchmarksService.currentRatio(this.company.id).subscribe(res => {
      this.currentRatioData = {
        title: 'Current Ratio',
        graphData: res.json().data,
        description:
          `<p><strong>Current Ratio = Current Assets/Current Liabilities</strong></p>
          <p>This ratio tells you the company's ability to pay current debt without having to resort to outside financing.</p> 
          <p>A current ratio of at least 1.0 is considered reasonable for liquidity purposes.</p>`
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getQuickRatio() {
    this.benchmarksService.quickRatio(this.company.id).subscribe(res => {
      this.quickRatioData = {
        title: 'Quick Ratio',
        graphData: res.json().data,
        description: 'this is quick ratio'
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getAssetTurnover() {
    this.benchmarksService.assetTurnover(this.company.id).subscribe(res => {
      this.assetTurnoverData = {
        title: 'Total Asset Turnover',
        graphData: res.json().data,
        description: 'this is asset turnover'
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getReturnOnAssets() {
    this.benchmarksService.returnOnAssets(this.company.id).subscribe(res => {
      this.returnOnAssetsData = {
        title: 'Return on Assets',
        graphData: res.json().data,
        description: 'this is return on assets'
      };
    }, err => {
      this.errorService.handle(err);
    });
  }
}
