import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.css']
})
export class EulaComponent {
  @Input() sideNavExpanded: boolean;
}
