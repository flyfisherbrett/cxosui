import { Directive, AfterViewInit } from '@angular/core';
import { User } from '../user';
declare var $, intuit;

@Directive({
  selector: '[appqb-connect]'
})

export class QbConnectDirective {

  constructor() { }
  ngAfterViewInit() {
    $('#sidebar').append('<ipp:connectToIntuit></ipp:connectToIntuit>');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//js.appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js';

    script.onload = function () {
        intuit.ipp.anywhere.setup({
        menuProxy: '/path/to/blue-dot',
        grantUrl: ('api/oauth/authenticate'+ '?user_id=')
      });
    };

    document.body.appendChild(script);
  }
}
