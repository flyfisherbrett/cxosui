import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SessionService } from '../../../session/session.service';
declare var $

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  token: ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.token = param.token;
      });

    this.sessionService.createByToken(this.token);
    this.router.navigate(['/cash_flow']);
  }

}
