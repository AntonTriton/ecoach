import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'

import { Step } from './step';

@Injectable()
export class DataService {
    currentStep: number;
    stepsLength: number;
    allData: Step[];
    /*getData(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }*/

    private dataUrl = 'data/coach.json';

    constructor (private http: Http) {
        this.currentStep = 5;
        this.stepsLength = 0;
    }

    getData(): Observable<Step[]> {
        console.log("getData", this.currentStep, this.allData);
        //this.currentStep = stepNum

        if(this.allData && this.allData.length){

          return Observable.of(this.allData);

        }else{
          return this.http.get(this.dataUrl)
              .map(this.extractData.bind(this))
              .catch(this.handleError);
        }
    }

    private extractData(res: Response, stepNum: number) {
        let body = res.json();
        this.allData = body.data;
        this.stepsLength = body.data.length;
        //return body.data[this.currentStep] || { };
        return body.data || { };
    }

    public setAnswer(index: number, answer: string){
        this.allData[index].answer = answer;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
