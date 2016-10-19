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

  constructor(private sessionService: SessionService,
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
      this.populateBenchmarks();
    });
  }

  ngOnInit() {
    this.benchmarksService.companyShow(this.company.id).subscribe(res => {
      this.extendedCompany = res.json().company;
      this.populateBenchmarks();
    }, err => {
      this.errorService.handle(err);
    });
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
        description: 'this is current ratio'
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

  checkUserRole() {
    if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
  }

  noDataWarning() {
    this.modalService.openModal(
      'No Industry Data',
      `<p>Could not find Industry data for this company. 
      Make sure the NAICS code is set for this company on the <a href="/settings">settings</a> page.</p>`,
      null);
  }
}
