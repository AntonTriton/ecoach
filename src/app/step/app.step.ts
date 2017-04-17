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

                this.stepNum = +params['stepNum']
                return this.dataService.getData()
            })
            .subscribe((data) => {
                this.parts = data;
                [this.currentStepIndex, this.currentPartIndex] = this.getIndexesByUrlParam(this.stepNum)
                this.partsLength = this.parts.length;
                this.part = this.parts[this.currentPartIndex];
                this.step = this.part.items[this.currentStepIndex];
                this.stepsLength = this.part.items.length;

                  console.log('subscribe', data, this.currentStepIndex, this.currentPartIndex);

                if(this.currentStepIndex === 0) this.showPartIntro = true;
            },
            error =>  this.errorMessage = <any>error);

    }

    stepForward(){
        console.log('stepForward', this.currentStepIndex, this.currentPartIndex)
        this.dataService.setAnswer(this.currentPartIndex, this.currentStepIndex, this.step.answer);

        if(this.currentStepIndex === 0 && this.showPartIntro === null){

          console.log('stepForward-0')

            this.showPartIntro = true;

        }else if(this.currentStepIndex === 0 && this.showPartIntro === true){

            console.log('stepForward-1')

            this.showPartIntro = false;

        }else {

          console.log('stepForward-2', this.currentStepIndex, this.currentPartIndex, this.partsLength)
          this.showPartIntro = null

          if(this.currentPartIndex === this.partsLength-1 && this.currentStepIndex === this.stepsLength-1) {
              console.log('stepForward-4')
              // show end page
              this.router.navigate(['end']);

            }else{
              console.log('stepForward-3', this.currentStepIndex)
                  //this.router.navigate(['/step', this.currentStepIndex]);
                  this.currentStepIndex++;
                  this.router.navigate(['/step', this.getStepIdByPartAndStepIndex()]);
            }
        }

    }

    stepBack(){
        if(this.currentStepIndex !== 0) {
            this.currentStepIndex--
            //this.step = this.data[this.currentStepIndex];
            this.router.navigate(['/step', this.getStepIdByPartAndStepIndex()]);
        }
    }

    getIndexesByUrlParam(stepId: number){
      let currentPartIndex, currentStepIndex;

      console.log('getIndexesByUrlParam', stepId)

      this.parts.forEach(function(part,partIndex,partsArr){

        part.items.forEach(function(item, itemIndex, itemsArr){
          if(item.id === stepId){
            currentStepIndex = itemIndex;
            currentPartIndex = partIndex;
          }
        })
      })

      return [currentStepIndex, currentPartIndex]
    }

    getStepIdByPartAndStepIndex(){
      console.log('getStepIdByPartAndStepIndex', this.currentPartIndex, this.currentStepIndex);
      if(this.currentStepIndex == this.stepsLength){
        this.currentPartIndex++;
        this.currentStepIndex = 0
      }
      return this.parts[this.currentPartIndex].items[this.currentStepIndex].id
    }

}
