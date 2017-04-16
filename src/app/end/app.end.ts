import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../step/data.service';

import { Step } from '../step/step';

import 'rxjs/add/operator/switchMap';

@Component({
  //selector: 'app-root',
  templateUrl: './app.end.html',
  styleUrls: ['./app.end.css']
})
export class AppEnd {
    errorMessage: string;
    currentStepIndex: number;
    allSteps: Step[];

    constructor (private dataService: DataService) {

         this.currentStepIndex = 0
    }

    ngOnInit() {

            this.dataService.getData().subscribe((data) => {
              console.log('subscribe', data);
                this.allSteps = data;
                //this.stepsLength = this.allSteps.length;
                //this.step = this.allSteps[this.currentStepIndex]
            },
            error =>  this.errorMessage = <any>error);

    }

}
