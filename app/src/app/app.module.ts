import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppStart } from './start/app.start';
import { AppLoginContent} from './start/login/app.login';
import { AppRegistrationContent} from './start/registration/app.registration';
import { AppStep} from './step/app.step';
import { AppEnd} from './end/app.end';
//import { AppIntro} from './intro/app.intro';

//
//
import { DataService } from './step/data.service';
import { LoginService } from './start/login.service';

const appRoutes: Routes = [
    { path: 'start', component: AppStart },
    { path: 'login', component: AppStart },
    { path: 'registration', component: AppStart },
    { path: 'part/:partNum/intro', component: AppStep },
    { path: 'part/:partNum/step/:stepNum', component: AppStep },
    { path: 'step/:stepNum', component: AppStep },
    { path: 'end', component: AppEnd },
    /*{ path: 'hero/:id',      component: HeroDetailComponent },
    {
        path: 'heroes',
        component: HeroListComponent,
        data: { title: 'Heroes List' }
    },*/
    { path: '',
        redirectTo: '/start',
        pathMatch: 'full'
    }/*,
    { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    AppStart,
    AppLoginContent,
    AppRegistrationContent,
    AppStep,
    AppEnd
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [DataService, LoginService],
  entryComponents: [AppLoginContent, AppRegistrationContent],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(){
        console.log('BrowserModule',BrowserModule);
    }
}
