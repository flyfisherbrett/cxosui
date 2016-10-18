import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private sessionService: SessionService, private router: Router) {
        if ( this.sessionService.isLoggedIn() ) { this.router.navigate(['/cash_flow']); }
    }

    login(event, email, password) {
        event.preventDefault();
        this.sessionService.login(email, password);
    }
}
