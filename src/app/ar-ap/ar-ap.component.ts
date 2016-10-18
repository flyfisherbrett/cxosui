import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ar-ap',
  templateUrl: './ar-ap.component.html',
  styleUrls: ['./ar-ap.component.css']
})
export class ArApComponent {
  @Input() data: any;

  constructor() {

  }

}
