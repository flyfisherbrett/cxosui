import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { SessionService } from './session/session.service';
import { ModalService } from './modal/modal.service';

import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { CashFlowChartComponent } from './cash-flow/cash-flow-chart/cash-flow-chart.component';
import { LoginComponent } from './login/login.component';
import { ArApComponent } from './ar-ap/ar-ap.component';
import { EmployeesComponent } from './employees/employees.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';
import { BenchmarkComponent } from './benchmarks/benchmark/benchmark.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorService } from './error/error.service';
import { SettingsComponent } from './settings/settings.component';
import { ExpByCatComponent } from './dashboard/exp-by-cat/exp-by-cat.component';
import { ModalComponent } from './modal/modal.component';


// import { EmployeesModule } from './employees/employees.module';


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideNavComponent,
    DashboardComponent,
    CashFlowComponent,
    CashFlowChartComponent,
    LoginComponent,
    ArApComponent,
    BenchmarksComponent,
    BenchmarkComponent,
    ProfileComponent,
    EmployeesComponent,
    SettingsComponent,
    ExpByCatComponent,
    ModalComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing
  ],
  providers: [SessionService, ErrorService, ModalService], // declared here to share data between components
  bootstrap: [AppComponent]
})

export class AppModule { }
