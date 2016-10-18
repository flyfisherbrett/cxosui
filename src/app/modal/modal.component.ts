import { Component, Input } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" id="modal-alert">
	    <div class="modal-content">
		    <span class="right"><i class="material-icons md-18 modal-close">close</i></span>
		    <h4 id="modal-header-content">modal header</h4>
		    <div id="modal-body-content">modal body</div>
	    </div>
	    <div id="modal-footer-content" class="modal-footer">
		    <a class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
	    </div>
    </div>
  `,
  styles: [`
    a {
        color: #1e7da9;
    }
    
    a:hover {
        color: #075488;
        font-weight: bold;
    }
  `]
})
export class ModalComponent {
    @Input() open: boolean;
    @Input() modalHeader: string;
    @Input() modalBody: string;

    constructor(private sessionService: SessionService, private router: Router) {
        if ( this.sessionService.isLoggedIn() ) { this.router.navigate(['/cash_flow']); }
    }

    openModal(event, email, password) {
        event.preventDefault();
        $('#modal-alert').openModal();
    }
}
