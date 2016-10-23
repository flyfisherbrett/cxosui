import { Component } from '@angular/core';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  style: any;
  container: any;
  constructor() { }

  // ngOnInit() {
  //   $('.parallax-mirror').show();
  //   this.style = $('style')[0];
  //   this.style.remove();
  //   this.container = $('#content-window');
  //   this.container.prop('id', '');

  // }

  // ngOnDestroy() {
  //   $('.parallax-mirror').hide();
  //   $('head').append(this.style);
  //   this.container.prop('id', 'content-window');
  // }
}
