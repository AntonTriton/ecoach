import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  //selector: 'app-root',
  templateUrl: './app.end.html',
  styleUrls: ['./app.end.css']
})
export class AppEnd {
    errorMessage: string;
    currentStepIndex: number;

    constructor () {

         this.currentStepIndex = 0
    }

    ngOnInit() {
        console.log("ngOnInit");


    }

}
