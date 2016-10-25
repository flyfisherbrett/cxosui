import { Directive,Input , AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../user';
declare var $, intuit;

@Directive({
  selector: '[appqb-connect]'
})

export class QbConnectDirective {
  @Input() user: User;

  constructor() {}

  ngAfterViewInit() {
    $('#qbConnect').append('<ipp:connectToIntuit></ipp:connectToIntuit>');
    var script = document.createElement('script');
    var userId = String(this.user.id);

    script.type = 'text/javascript';
    script.src = '//js.appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js';

    script.onload = function () {
        intuit.ipp.anywhere.setup({
        menuProxy: '/path/to/blue-dot',
        grantUrl: (environment.apiEndpoint + 'api/oauth/authenticate' + '?user_id=' + userId)
      });
    };

    document.body.appendChild(script);
  }
}
