import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'

//import { Part } from './part';

@Injectable()
export class LoginService {
    currentStep: number;
    stepsLength: number;
    /*getData(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }*/

    private registrationUrl = 'http://localhost:8000/registration';
    private loginUrl = 'http://localhost:8000/login';

    constructor (private http: Http) {
        this.currentStep = 5;
        this.stepsLength = 0;
    }

    registration (data) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      console.log('registration', this.registrationUrl, JSON.stringify(data), this.http.post);

      this.http.post(this.registrationUrl, data, options).subscribe(r=>{})
                    // .map(this.extractData)
                    // .catch(this.handleError);
    }

    login (credentials) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      console.log('login', this.loginUrl, credentials);

      this.http.post(this.loginUrl, credentials, options).subscribe(r=>{})
    }

    logout () {

    }

    // getData(): Observable<AllData> {
    //     console.log("getData", this.currentStep, this.parts);
    //     //this.currentStep = stepNum
    //
    //     if(this.allData){
    //
    //       return Observable.of(this.allData);
    //
    //     }else{
    //       return this.http.get(this.dataUrl)
    //           .map(this.extractData.bind(this))
    //           .catch(this.handleError);
    //     }
    // }

    private extractData(res: Response, stepNum: number) {
        let body = res.json();
        //this.allData = body.data;
        return body.data || { };
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
