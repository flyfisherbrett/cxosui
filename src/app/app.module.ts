import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import 'materialize-css';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { UserService } from './user/user.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideNavComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing
  ],
  providers: [UserService], // declared here to share data between components
  bootstrap: [AppComponent]
})

export class AppModule { }
