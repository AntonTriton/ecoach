import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppLoginContent} from './login/app.login';
import {AppRegistrationContent} from './registration/app.registration';

console.log('NgbModal 2', NgbModal);

@Component({
  templateUrl: './app.start.html',
  styleUrls: ['./app.start.css']
})
export class AppStart {

  constructor (
      private modalService: NgbModal,
      private route: ActivatedRoute,
      private router: Router) {
        //
  }

  ngOnInit() {
      console.log("ngOnInit start", this.route, this.router.url);//

      if(this.router.url === '/login'){
        this.showLoginForm()
      } else if (this.router.url === '/registration') {
        this.showRegistrationForm()
      }
  }

  showLoginForm () {
    //
    console.log('showLoginForm', AppLoginContent);
    const loginModalRef = this.modalService.open(AppLoginContent);
    loginModalRef.componentInstance.name = 'World';
    loginModalRef.result.then(() => {
      console.log('1')
    }, () => {
      console.log('2');
      this.router.navigate(['start']);
    })
  }

  showRegistrationForm () {
    const regModalRef = this.modalService.open(AppRegistrationContent);
    regModalRef.componentInstance.name = 'World';

    regModalRef.result.then(() => {
      console.log('1')
    }, () => {
      console.log('2');
      this.router.navigate(['start']);
    })
  }


}
