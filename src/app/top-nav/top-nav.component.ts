import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Output() sideNavChange = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Input() loggedIn;

  toggleSideNav(e) {
    e.preventDefault();
    this.sideNavChange.emit();
  }

  emitLogout() {
    this.logout.emit();
  }
}
