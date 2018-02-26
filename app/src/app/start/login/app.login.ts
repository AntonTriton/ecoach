import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {LoginService} from '../login.service';

import {LoginModel} from './loginModel';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './app.login.html'
})
export class AppLoginContent {
  loginModel: LoginModel

  constructor(public activeModal: NgbActiveModal,
    private loginService: LoginService) {
      this.loginModel = new LoginModel()
    }

  onSubmit () {
    console.log('onSubmit login', this.loginModel.username, this.loginModel.password);
    // let credentials = {
    //   username: this.name,
    //   password: this.passw
    // }
    this.loginService.login(this.loginModel)
  }

  reject () {
    //
    console.log('activeModal',this.activeModal);
    this.activeModal.dismiss()
  }
}
