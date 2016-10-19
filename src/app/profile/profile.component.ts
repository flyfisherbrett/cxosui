import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { ProfileService } from './profile.service';
import { ErrorService } from '../error/error.service';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import { Company } from '../company';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // declared here as it only services this component
})
export class ProfileComponent implements OnInit {
  user: User;
  company: Company;
  employee: any;
  data: any;
  uploadStatus = 'none';
  passwordChangeStatus = 'none';
  profile = {
    first_name: '',
    last_name: '',
    primary_email: '',
    secondary_email: '',
    title: '',
    role: '',
    pay_type: '',
    classification: '',
    picture: ''
  };

  constructor(private sessionService: SessionService,
              private router: Router,
              private profileService: ProfileService,
              private errorService: ErrorService,
              private modalService: ModalService) {

    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.user = this.sessionService.getUser();
    this.company = this.sessionService.getCompany();

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
      this.show();
    });
  }
    ngOnInit() {
      this.show();
    }

    buildProfile(data) {
      this.employee = data.employee;
      let user = data.employee.user;
      this.profile = {
        first_name: user.first_name,
        last_name: user.last_name,
        primary_email: user.email,
        secondary_email: user.secondary_email,
        title: data.employee.title,
        role: data.employee.role,
        pay_type: data.employee.pay_type,
        classification: data.employee.classification,
        picture: data.employee.user.attachment_url
      };
    }

    showPasswordChange(e) {
      e.preventDefault();
    }

    show() {
      this.profileService.show(this.company.id, this.company.employee_id).subscribe(res => {
        this.buildProfile(res.json());
      }, err => {
        this.errorService.handle(err);
      });
    }

    uploadPicture(e) {
      let file = e.srcElement.files[0];
      this.uploadStatus = 'uploading';
      this.profileService.profilePicture(this.user.id, file).then(res => {
        this.profile.picture = res['url'];
        this.uploadStatus = 'none';
      }, err => {
        this.errorService.handle(err);
        this.uploadStatus = 'none';
      });
    }

    saveChanges() {
      this.updateEmployeeModel();
      this.profileService.updateProfile(this.employee.id, this.parseEmployeeForUpdate())
        .subscribe(res => {
          this.updatedModal();
        }, err => {
          console.log(err);
        });
    }

    updatedModal() {
      this.modalService.openModal('Account Updated',
        '<p>Your profile settings have been updated</p>',
        null);
    }

    updateEmployeeModel() {
      let user = this.employee.user;
      user.first_name = this.profile.first_name;
      user.last_name = this.profile.last_name;
      user.email = this.profile.primary_email;
      user.secondary_email = this.profile.secondary_email;
      user.attachment_url = this.profile.picture;
      this.employee.title = this.profile.title;
      // will need more when other attributes are available
    }

    parseEmployeeForUpdate() {
      return {
        user: this.employee.user,
        title: this.employee.title
      };
      // will also need more attributes in future
    }

    revertChanges() {}
}
