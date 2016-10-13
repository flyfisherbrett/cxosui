import { Component, OnInit } from '@angular/core';
import { SessionService, User, Company } from '../session/session.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // declared here as it only services this component
})
export class ProfileComponent implements OnInit {
  user: User;
  company: Company;
  data: any;

    constructor(private sessionService: SessionService, private router: Router, private profileService: ProfileService) {

    }

    ngOnInit() {

    }

}
