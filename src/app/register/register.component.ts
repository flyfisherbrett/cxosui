import { Component  } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})

export class RegisterComponent {
  errors = {};
  hasErrors = false;
  submitted = false;
  signingUp = true;
  subscription = {};
  user = {};
  constructor(
    private errorService: ErrorService,
    private registerService: RegisterService
  ){}

  onSubmit() { this.submitted = true; }

  create(){
    this.registerService.create(this.user, this.subscription)
      .subscribe(
      res => {
        this.signingUp = false;
      }, err => {
        this.hasErrors = true;
        this.errors = err.json().errors;
        this.errorService.handle(err);
      });
  }
}
