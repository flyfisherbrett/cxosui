import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  submitted = false;
  subscription = {};
  user = {};
  constructor(
    private errorService: ErrorService,
    private registerService: RegisterService,
    private router: Router
  ){}

  onSubmit() { this.submitted = true; }

  create(){
    this.registerService.create(this.user, this.subscription)
      .subscribe(
      res => {
        this.router.navigate(['/']);
      }, err => {
        this.errorService.handle(err);
      });
  }
}
