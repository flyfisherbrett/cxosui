import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { SettingsService } from './settings.service';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';
import { Company } from '../company';
import { User } from '../user';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService] // declared here as it only services this component
})

export class SettingsComponent implements OnInit {
  user: User;
  company: Company;
  codes = [];
  filteredCodes = [];
  extendedCompany = {};
  searchText = '';

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private settingsService: SettingsService,
    private errorService: ErrorService,
    private modalService: ModalService) {

    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.user = this.sessionService.getUser();
    this.company = this.sessionService.getCompany();
    this.checkUserRole();

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
      this.show();
      this.checkUserRole();
    });
  }
  ngOnInit() {
    this.show();
  }

  show() {
    this.settingsService.show(this.company.id).subscribe(res => {
      this.extendedCompany = res.json().company;
      let unparsedCodes = res.json().fields[0].options;
      this.codes = unparsedCodes.map(code => {
        return {
          text: code,
          code: parseInt(code.split(':').pop(), 10)
        };
      });
      this.filteredCodes = this.codes;
    }, err => {
      this.errorService.handle(err);
    });
  }

  setCode(c) {
    this.extendedCompany['naics_code'] = c;
  }

  saveCode() {
    this.settingsService.saveCode(this.company.id, this.extendedCompany['naics_code']).subscribe(res => {
      console.log(res.json());
      this.modalService.openModal(
        'Industry Code Updated',
        '<p>The Industry code for ' + this.company.name + ' has been updated.</p>', null)
    }, err => {
      this.modalService.openModal(
        'Update Failed',
        '<p>Failed to update Industry Code for ' + this.company.name + '.</p>', null
      );
    });
  }

  filterCodes() {
    if (this.searchText) {
      this.filteredCodes = this.codes.filter(code => {
        return code.text.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
      });
    }
  }

  checkUserRole() {
    if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
  }

  addUser(firstName, lastName, email) {
    let user = {
      first_name: firstName,
      last_name: lastName,
      email: email
    }
    this.settingsService.createSystemUser(this.company.id, user)
      .subscribe(res => {
        this.modalService.openModal(
          'User Created',
          '<p>A System Admin User has been created.</p>',
          null);
      }, err => {
        this.modalService.openModal('Creation Failed', '<p>Failed to create User</p>', null);
      })
  }

}
