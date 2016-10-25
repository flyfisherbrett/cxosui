import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddCompanyService } from '../../company/add-company/add-company.service';
import { SessionService } from '../../session/session.service';
import { Company } from '../../company';
import { User } from '../../user';
declare var $

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
  providers: [AddCompanyService]
})
export class AddCompanyComponent {
  companies: Array<Company>;
  data: any;
  user: User;

  constructor(
    private addCompanyService: AddCompanyService,
    private router: Router,
    private sessionService: SessionService) {
    this.loadCompanies();

    this.user = this.sessionService.getUser();
  }

  loadCompanies(){
    this.addCompanyService.index()
    .subscribe(res => {
      this.data = res.json();

      if(this.data.companies.length > 0) {
        localStorage.removeItem('companies');
        this.sessionService.loadCompany(this.data);
        this.router.navigate(['/cash_flow']);
      }

    }, err => {

    });
  }

  // qbConnect(event, count) {
  //   this.companies = this.sessionService.getCompanies();
  //   if (count === 10) {
  //     this.router.navigate(['/cash_flow']);
  //   }
  //
  //   this.addCompanyService.index()
  //     .subscribe(res => {
  //       this.data = res.json();
  //
  //       if(this.data.length > this.companies.length ) {
  //         this.sessionService.loadSessionData(this.data);
  //         this.router.navigate(['/cash_flow']);
  //       } else {
  //         this.qbConnect(event, count += 1);
  //       }
  //
  //     }, err => {
  //       this.router.navigate(['/cash_flow']);
  //       this.qbConnect(event, count += 1);
  //     });
  // }
}
