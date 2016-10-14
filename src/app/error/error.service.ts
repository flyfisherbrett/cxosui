import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { SessionService } from '../session/session.service';

@Injectable()
export class ErrorService {

    constructor(private sessionService: SessionService) {}

    handle(error) {
        console.log(error.json());
        let errors = error.json().errors;
        let messages = error.json().messages;

        if (errors && errors.includes('Authentication token has expired')) {
            this.sessionService.logout();
        }

        if (messages && messages === 'not authorized') {
            console.log('unauthorized');
        }
    }

}
