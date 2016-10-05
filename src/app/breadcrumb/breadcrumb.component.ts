import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div id="crumb" class="col s12">
        <a  *ngFor="let link of links; let l = last"
            href="{{link.href}}"
            class="breadcrumb blue-text">{{link.text}} {{l}}</a>
    </div>
  `,
  styles: [`
    #crumb {
        background-color: grey;
    }
  `]
})
export class BreadcrumbComponent {
    @Input() links: [{}];
}
