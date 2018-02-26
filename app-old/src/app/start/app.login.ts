import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  //templateUrl: './app.login.html'
  template: '<div>Hello {{name}}</div>'
})
export class AppLoginContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

// @Component({
//   selector: 'ngbd-modal-component',
//   templateUrl: 'src/modal-component.html'
// })
// export class AppLogin {
//   constructor(private modalService: NgbModal) {}
//
//   open() {
//     const modalRef = this.modalService.open(AppLoginContent);
//     modalRef.componentInstance.name = 'World';
//   }
// }
