import { Directive, Input} from '@angular/core';
import { environment } from '../../../environments/environment';
declare var $, intuit;

@Directive({
  selector: '[appqb-direct-connect]'
})

export class QbDirectConnectDirective {

  constructor() {this.loadScript();}

  loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//js.appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js';

    document.body.appendChild(script);
    
    script.onload = function () {
      intuit.ipp.anywhere.setup({
        menuProxy: '/path/to/blue-dot',
        grantUrl: (environment.apiEndpoint + 'auth/intuit')
      });
      intuit.ipp.anywhere.directConnectToIntuit();
    };
  }
}
