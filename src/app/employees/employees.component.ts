import { Component, OnInit } from '@angular/core';
import { SessionService, User, Company } from '../session/session.service';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    manager: string;
    manager_id: number;
    role: string;
    pending_invitation: boolean;
    managers: any;
}

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    providers: [EmployeesService] // declared here as it only services this component
})
export class EmployeesComponent implements OnInit {
    user: User;
    company: Company;
    employees: Array<Employee>;

    constructor(private sessionService: SessionService, private router: Router, private employeesService: EmployeesService) {
        if (!this.sessionService.isLoggedIn()) {
            this.router.navigate(['/']);
        }

        this.user = this.sessionService.getUser();
        this.company = this.sessionService.getCompany();

        this.sessionService.companySwitch.subscribe(c => {
            this.company = c;
            this.index();
        });
    }

    ngOnInit() {
        this.index();
    }

    index() {
        this.employeesService.index(this.company.id).subscribe(res => {
            this.employees = res.json().company.employees;
            console.log(this.employees);
        });
    }

}
