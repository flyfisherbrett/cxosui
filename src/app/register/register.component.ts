import { Component  } from '@angular/core';
import { Us}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  submitted = false;
  onSubmit() { this.submitted = true; }
}
