import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { EulaComponent } from './footer/eula.component';
import { SupportComponent } from './footer/support.component';
import { PrivacyComponent } from './footer/privacy.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
         path: 'settings',
        component: SettingsComponent
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
        path: 'register',
        component: RegisterComponent
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
