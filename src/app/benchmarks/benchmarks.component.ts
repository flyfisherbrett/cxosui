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
        description: `The amount of cash on your company's balance sheet consists of the physical currency, bank account balances and checks from customers that have not been deposited. The amount of total assets is the amount of the company's total resources that it uses in its business. You can measure cash as a percentage of total assets to determine the relative amount of cash the company holds.
<br /><br />
For example, assume a company's balance sheet shows $100,000 in cash and the company has $500,000 in total assets. Cash as a Percentage of Current Assets metric is calculate like this:
<br /><br />
<strong>Cash as a Percentage of Current Assets = (Cash/Total Assets)*100</strong>
<br /><br />
In this example, divide $100,000 in cash by $500,000 in total assets to get 0.2 and multiply your result by 100 to convert it to a percentage. `
      };
    }, err => {
      this.errorService.handle(err);
    });
  }

  getReceivables() {
    this.benchmarksService.receivables(this.company.id).subscribe(res => {
      this.receivablesData = {
        title: 'Receivables as % of Current Assets',
        graphData: res.json().data,
        description: `If the receivables as a percentage of current assets ratio is very high, it could indicate that the credit policy of the business requires attention.
<br /><br />
Receivables as a percentage of current assets reveals the size of receivables in current assets and the opportunity cost associated with it. The higher the percentage the higher the opportunity cost of carrying the receivables. If this money were not locked up in receivables, it could have been invested elsewhere to earn a return or used to pay off other debts of the business.`
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
        description: `This ratio tells you the company's ability to pay current debt without having to resort to outside financing. Let's say you're looking at a company's balance sheet. Current assets are $100,000 and current liabilities are $45,000. The current ratio is 2.2 ($100,000 / $45,000). In this case, the company has sufficient current assets to pay current liabilities without going to outside financing. The current ratio metric is calculate like this:
<br /><br />
<strong>Current Ratio = Current Assets/Current Liabilities</strong>
<br /><br />
A current ratio of at least 1.0 is considered reasonable for liquidity purposes. That's because the ratio displays at least $1 in current assets for each dollar of current liabilities.`
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
        description: `The quick ratio is more restrictive than the current ratio. Only cash and assets that can be immediately converted into cash are included, which excludes inventory. In some businesses, it may take many months to sell inventory. The quick ratio metric is calculate like this:
<br /><br />
<strong>Quick Ratio = Current Assets--Inventory/Current Liabilities</strong>`
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
        description: `Assets that do not generate sales simply cost money. Use the total asset turnover profitability benchmark to determine how effective you are at using your assets to generate sales. The total asset turnover metric is calculated like this:
<br /><br />
<strong>Total Asset Turnover = Net Sales/Average Total Assets</strong>
<br /><br />
The simplest example here is inventory: If a company has assets in the form of inventory that isn't being sold, then it's paying for the storage of that inventory without actually generating sales on it. The total asset turnover metric helps indicate how well a company manages its assets.`
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
        description: `The return on assets (ROA) ratio shows you how much your company earns from its assets or capital invested. You can judge how well you use your assets. If the ROA is a high percentage, the company is likely managing its assets well. To calculate ROA, divide net income by total assets.
<br /><br />
<strong>Return on Assets = Net Income/Total Assets</strong>
<br /><br />
This ratio gives investors and debtors a clear view of how well a company's management uses its assets to generate a profit. As with all ratios, you need to compare results with those of similar companies in an industry for the numbers to mean anything.`
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
