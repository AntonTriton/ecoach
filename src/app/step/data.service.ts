import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Step } from './step';

@Injectable()
export class DataService {
    currentStep: number;
    stepsLength: number;
    /*getData(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }*/

    private dataUrl = 'data/coach.json';

    constructor (private http: Http) {
        this.currentStep = 5;
        this.stepsLength = 0;
    }

    getData(stepNum: number): Observable<Step> {
        console.log("getData", this.currentStep);
        this.currentStep = stepNum
        console.log("getData", this.currentStep);
        return this.http.get(this.dataUrl)
            .map(this.extractData.bind(this))
            .catch(this.handleError);
    }

    private extractData(res: Response, stepNum: number) {
        let body = res.json();
        this.stepsLength = body.data.length;
        return body.data[this.currentStep] || { };
    }

    public getStepsLength(){
        return this.stepsLength;
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

