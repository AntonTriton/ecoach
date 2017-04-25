import { Component } from '@angular/core';

import { DataService } from './data.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Part } from './part';
import { Step } from './step';

import 'rxjs/add/operator/switchMap';

@Component({
  //selector: 'app-root',
  templateUrl: './app.step.html',
  styleUrls: ['./app.step.css']
})
export class AppStep {
    errorMessage: string;
    currentStepIndex: number;
    currentPartIndex: number;
    partsLength: number;
    stepsLength: number;
    stepNum: number;
    partNum: number;
    showPartIntro: boolean;
    parts: Part[];
    allSteps: Step[];
    part: Part;
    step: Step;
    dataStep: Step;

    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService) {
        this.step = new Step()

         this.currentStepIndex = 0
    }

    ngOnInit() {
        console.log("ngOnInit", this.route.params);//

        this.route.params
            .switchMap((params: Params) => {
                console.log('params--', params, params['stepNum']);
                //this.dataService.getData(+params['id'])

                this.currentStepIndex = params['stepNum'] ? +params['stepNum'] : undefined;
                this.currentPartIndex = +params['partNum']
                return this.dataService.getData()
            })
            .subscribe((data) => {

                if(data.hasParts){
                  this.parts = data.parts;
                  //[this.currentStepIndex, this.currentPartIndex] = this.getIndexesByUrlParam(this.partNum, this.stepNum)
                  this.partsLength = this.parts.length;
                  this.part = this.parts[this.currentPartIndex];
                  this.step = this.part.items[this.currentStepIndex];
                  this.stepsLength = this.part.items.length;

                  console.log('subscribe', data, this.currentStepIndex, this.currentPartIndex, this.stepsLength);
                }

                if(this.currentStepIndex === undefined){
                  this.showPartIntro = true;
                }else{
                  this.showPartIntro = false;
                }

            },
            error =>  this.errorMessage = <any>error);

    }

    stepForward(){

      console.log('stepForward', this.currentPartIndex, this.currentStepIndex )

      if(this.currentPartIndex === this.partsLength - 1 && this.currentStepIndex === this.stepsLength - 1){
          console.log('stepForward 1', this.currentPartIndex, this.currentStepIndex);
          this.router.navigate(['/end']);
      }else if(this.currentStepIndex === this.stepsLength - 1){
        console.log('stepForward 2', this.currentPartIndex, this.currentStepIndex);
          this.currentPartIndex++
          this.router.navigate(['/part/'+this.currentPartIndex+'/intro']);
      }else{
        console.log('stepForward 3', this.currentPartIndex, this.currentStepIndex);
          this.currentStepIndex !== undefined ?
            this.currentStepIndex++ :
            this.currentStepIndex = 0;

          this.router.navigate(['part/'+this.currentPartIndex+'/step/'+this.currentStepIndex]);
      }

    }

    stepBack(){

      if(this.currentPartIndex === 0 && this.currentStepIndex === undefined){
          console.log('stepBack 1', this.currentPartIndex, this.currentStepIndex);
          this.router.navigate(['/start']);
      }else if(this.currentStepIndex === undefined){
          console.log('stepBack 1', this.currentPartIndex, this.currentStepIndex);

          this.currentPartIndex ?
            this.currentPartIndex-- :
            this.currentPartIndex = 0;

          this.currentStepIndex = this.parts[this.currentPartIndex].items.length - 1

          this.router.navigate(['part/'+this.currentPartIndex+'/step/'+this.currentStepIndex]);
      }else if(this.currentStepIndex === 0){
          console.log('stepBack 2', this.currentPartIndex, this.currentStepIndex);
          this.router.navigate(['/part/'+this.currentPartIndex+'/intro']);
      }else{
          console.log('stepBack 3', this.currentPartIndex, this.currentStepIndex);
          this.currentStepIndex !== undefined ?
            this.currentStepIndex-- :
            this.currentStepIndex = 0;

          this.router.navigate(['part/'+this.currentPartIndex+'/step/'+this.currentStepIndex]);
      }

      }

}
