import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div id="crumb" class="col s12">
        <span *ngFor="let link of links; let l = last">
            <a class="crumb-link crumb-text" href="{{link.href}}">{{link.text}}</a>
            <span *ngIf="!l" class="separator crumb-text">/</span>
        </span>
    </div>
  `,
  styles: [`
    #crumb {
        margin: 15px 0px 15px 0px;
    }
    .crumb-text {
        font-size: 14px;
        color: #797d80;
    }
    .separator {
        margin: 0px 10px 0px 10px;
    }
  `]
})
export class BreadcrumbComponent {
    @Input() links: [{}];
}
