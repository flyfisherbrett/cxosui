import { Component, OnInit } from '@angular/core';
import { SessionService, User, Company } from '../session/session.service';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeesService] // declared here as it only services this component
})
export class EmployeesComponent implements OnInit {
  user: User;
  company: Company;
  data: any;

    constructor(private sessionService: SessionService, private router: Router, private employeesService: EmployeesService) {

    }

    ngOnInit() {

    }

}
