import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeesComponent } from './employees/employees.component';
import { SettingsComponent } from './settings/settings.component';
import { EulaComponent } from './footer/eula.component';
import { SupportComponent } from './footer/support.component';
import { PrivacyComponent } from './footer/privacy.component';

// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'cash_flow',
        component: DashboardComponent
    },
    {
        path: 'employees',
        component: EmployeesComponent
    },
    {
        path: 'benchmarks',
        component: BenchmarksComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'eula',
        component: EulaComponent
    },
    {
        path: 'support',
        component: SupportComponent
    },
    {
        path: 'privacy_policy',
        component: PrivacyComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
