import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

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
    }
    // {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // },
    // {
    //     path: '**',
    //     component: NotFoundComponent
    // }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
