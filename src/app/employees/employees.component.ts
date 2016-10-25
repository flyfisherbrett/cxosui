import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
import { Company } from '../company';
import { User } from '../user';

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
    formerEmployees: Array<Employee>;
    selectedEmployees: Array<Employee>;

    constructor(private sessionService: SessionService,
                private router: Router,
                private employeesService: EmployeesService,
                private errorService: ErrorService) {
        if (!this.sessionService.isLoggedIn()) {
            this.router.navigate(['/']);
        }

        this.user = this.sessionService.getUser();
        this.company = this.sessionService.getCompany();
        this.checkCompany();
        this.checkUserRole();

        this.sessionService.companySwitch.subscribe(c => {
            this.company = c;
            this.checkUserRole();
            this.index();
        });
    }

    ngOnInit() {
      this.checkCompany();
      this.index();
    }

    index() {
        this.employeesService.index(this.company.id).subscribe(res => {
            this.employees = res.json().company.employees;
            this.formerEmployees = res.json().company.former_employees;
            this.selectedEmployees = this.employees;
        }, err => {
            this.errorService.handle(err);
        });
    }

    checkCompany() {
      if (Object.keys(this.company).length === 0) { this.router.navigate(['/add_company']); }
    }

    checkUserRole() {
        if (this.company.role !== 'admin') { this.router.navigate(['/profile']); }
    }

    currentEmployees(boo) {
        if (boo) { this.selectedEmployees = this.employees; } else { this.selectedEmployees = this.formerEmployees; }
    }

}
