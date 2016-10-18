import { Injectable } from '@angular/core';
declare var $;

@Injectable()
export class ModalService {

    openModal(header, body, buttons) {
        $('#modal-header-content').text(header);
        $('#modal-body-content').html(body);
        $('#modal-footer-content').html(buttons);
        $('#modal-alert').openModal();
    }

}
