import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private userService: UserService, private router: Router) {
        if ( this.userService.isLoggedIn() ) { this.router.navigate(['/cash_flow']); }
    }

    login(event, email, password) {
        event.preventDefault();
        this.userService.login(email, password);
    }
}
