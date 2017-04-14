import { Component } from '@angular/core';

import { DataService } from './data.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

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
                console.log('params', params, params['stepNum']);
                //this.dataService.getData(+params['id'])

                this.currentStepIndex = +params['stepNum']
                return this.dataService.getData(this.currentStepIndex)//
            })
            .subscribe((data) => {
                this.step = data;
                this.stepsLength = this.dataService.getStepsLength()
                console.log('getData', this.step);//
            },
            error =>  this.errorMessage = <any>error);

        //this.getData();
    }

    /*getData(){
        this.dataService.getData()
            .subscribe(
            (data) => {
                this.data = data
                console.log('getData', this.data);
                this.step = this.data[this.currentStepIndex];
            },
                error =>  this.errorMessage = <any>error
        );

    }*/

    stepForward(){
        console.log('stepForward')
        if(this.currentStepIndex !== this.stepsLength-1) {
            this.currentStepIndex++
            this.router.navigate(['/step', this.currentStepIndex]);
            //this.step = this.data[this.currentStepIndex];
        }else{
          // show end page
          this.router.navigate(['end']);
        }
    }

    stepBack(){
        if(this.currentStepIndex !== 0) {
            this.currentStepIndex--
            //this.step = this.data[this.currentStepIndex];
            this.router.navigate(['/step', this.currentStepIndex]);
        }
    }
}
