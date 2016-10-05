import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Output() sideNavChange = new EventEmitter();

  toggleSideNav(e) {
    e.preventDefault();
    this.sideNavChange.emit();
  }
}
