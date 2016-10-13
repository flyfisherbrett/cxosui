import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html',
  styles: [`
    #not-found {
        margin-top: 60px;
    }
  `]
})
export class NotFoundComponent {

    constructor (private sessionService: SessionService) {}

    isLoggedIn() {
        return this.sessionService.isLoggedIn();
    }
}
