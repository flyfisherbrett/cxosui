import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Company } from '../company';
import { User } from '../user';

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
  @Output() addCompany = new EventEmitter();
  showConnect: boolean = false;

  constructor(private sessionService: SessionService) {}

  changeCompany(id) {
    this.companyChange.emit( parseInt(id, 10) );
  }

  renameRole(role) {
    let roleMap = {
      'admin': 'administrator',
      'manager': 'manager',
      'employee': 'employee'
    };
    return roleMap[role];
  }

  emitAddCompany(e) {
    this.showConnect = true;
  }
}
