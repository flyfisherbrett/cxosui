import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { NotFoundComponent } from '../not-found/not-found.component';


// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { NotFoundComponent } from './not-found/not-found.component';

const employeesRoutes: Routes = [
    {
        path: '',
        component: EmployeesComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const employeesRouting: ModuleWithProviders = RouterModule.forChild(employeesRoutes);
