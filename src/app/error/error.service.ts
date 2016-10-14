import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ErrorService {

    handle(error) {
        console.log(error);
    }

}
