import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {LoginService} from '../login.service';

import {RegModel} from './regModel';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './app.registration.html',
  styleUrls: ['./app.registration.css']
})
export class AppRegistrationContent {
  regModel: RegModel

  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService
  ) {
    this.regModel = new RegModel()
    console.log('regModel', this.regModel, RegModel);
  }

  onSubmit () {
    //
    //console.log('onSubmit', this.regModel);
    // let credentials = {
    //   name: this.name,
    //   email: this.email,
    //   password: this.password
    // }
    this.loginService.registration(this.regModel)
  }

  reject () {
    //
    console.log('activeModal',this.activeModal);
    this.activeModal.dismiss()
  }
}
