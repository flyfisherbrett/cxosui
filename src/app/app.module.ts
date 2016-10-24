import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { ErrorService } from './error/error.service';
import { ModalService } from './modal/modal.service';
import { SessionService } from './session/session.service';

import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { EulaComponent } from './footer/eula.component';
import { PrivacyComponent } from './footer/privacy.component';
import { SupportComponent } from './footer/support.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { ArApComponent } from './ar-ap/ar-ap.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { CashFlowChartComponent } from './cash-flow/cash-flow-chart/cash-flow-chart.component';
import { ExpByCatComponent } from './dashboard/exp-by-cat/exp-by-cat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeesComponent } from './employees/employees.component';
import { BenchmarksComponent } from './benchmarks/benchmarks.component';
import { BenchmarkComponent } from './benchmarks/benchmark/benchmark.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ModalComponent } from './modal/modal.component';

// ---- elements for future implementation ----
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
// import { EmployeesModule } from './employees/employees.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent,
    SideNavComponent,
    DashboardComponent,
    CashFlowComponent,
    CashFlowChartComponent,
    LoginComponent,
    RegisterComponent,
    ArApComponent,
    BenchmarksComponent,
    BenchmarkComponent,
    ProfileComponent,
    EmployeesComponent,
    SettingsComponent,
    ExpByCatComponent,
    ModalComponent,
    NotFoundComponent,
    HomeComponent,
    EulaComponent,
    SupportComponent,
    PrivacyComponent
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
