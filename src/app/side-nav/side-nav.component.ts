import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SessionService, Company, User } from '../session/session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() expanded: boolean;
  @Input() user: User;
  @Input() companies: Array<Company>;
  @Input() company: Company;
  @Output() companyChange = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private sessionService: SessionService) {}

  emitLogout() { this.logout.emit(); }


  changeCompany(id) {
    this.companyChange.emit( parseInt(id) );
  }

  renameRole(role) {
    let roleMap = {
      'admin': 'administrator',
      'manager': 'manager',
      'employee': 'employee'
    };
    return roleMap[role];
  }

  addCompany(e) {
    e.preventDefault();
    console.log('add it!');
  }
}
