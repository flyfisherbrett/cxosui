import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  style: any;
  constructor() { }

  ngOnInit() {
    $('.parallax-mirror').show();
    this.style = $('style')[0];
    this.style.remove();
  }

  ngOnDestroy() {
    $('.parallax-mirror').hide();
    $('head').append(this.style);
  }
}
