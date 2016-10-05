import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  sideNavExpanded = true;

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
    console.log(this.sideNavExpanded);
  }
}
