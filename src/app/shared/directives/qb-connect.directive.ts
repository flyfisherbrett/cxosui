import { Directive, AfterViewInit } from '@angular/core';
declare var $

@Directive({
  selector: '[appqb-connect]'
})

export class QbConnectDirective {

  constructor() { }
  ngAfterViewInit() {
    $('#modal-footer-content').append('<ipp:connectToIntuit></ipp:connectToIntuit>');
  }
}
