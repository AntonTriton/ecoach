import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppLoginContent} from './app.login';

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
    const modalRef = this.modalService.open(AppLoginContent);
    modalRef.componentInstance.name = 'World';
  }

  showRegistrationForm () {

  }


}
