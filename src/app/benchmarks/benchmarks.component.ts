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
    });
  }

  ngOnInit() {
    this.benchmarksService.companyShow(this.company.id).subscribe(res => {
      this.extendedCompany = res.json().company;
      console.log(this.extendedCompany);
      this.getIndustryData();

    }, err => {
      this.errorService.handle(err);
    })

    // this.benchmarksService.index(this.company.id).subscribe(res => {
    //   if (res.json().error === 'cannot find industry data') {
    //     this.modalService.openModal(
    //       'No Industry Data',
    //       `<p>Could not find Industry data for this company. 
    //       Please set the NAICS code on the <a href="/settings">settings</a> page.</p>`,
    //       null);
    //   } else {
    //     console.log(res.json());
    //   }
    // }, err => {
    //   console.log(err.json());
    //   if (err.json().error === 'cannot find industry data') {
    //     this.modalService.openModal(
    //       'No Industry Data',
    //       '<p>Could not find Industry data for this company. Please set the NAICS code on the settings page.</p>',
    //       null);
    //   } else {
    //     this.errorService.handle(err);
    //   }
    // });
  }

  getIndustryData() {
    console.log(this.extendedCompany['naics_code']);
    this.benchmarksService.benchmarkData(this.extendedCompany['naics_code']).subscribe(res => {
      if (res.json().error === 'cannot find industry data') {
        this.modalService.openModal(
          'No Industry Data',
          `<p>Could not find Industry data for this company. 
          Make sure the NAICS code is set for this company on the <a href="/settings">settings</a> page.</p>`,
          null);
        console.log(res.json());
      } else {
        console.log(this.extendedCompany['naics_code']);
        console.log(res.json());
      }
    }, err => {
      this.errorService.handle(err);
    });
  }

  checkUserRole() {
    if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
  }

}
