import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import { ChartModule } from 'angular2-highcharts';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { SessionService } from './session/session.service';
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
    EmployeesComponent,
    BenchmarksComponent,
    BenchmarkComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ChartModule,
    routing
  ],
  providers: [SessionService], // declared here to share data between components
  bootstrap: [AppComponent]
})

export class AppModule { }
