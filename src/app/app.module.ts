import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppStart } from './start/app.start';
import { AppStep} from './step/app.step';
import { AppEnd} from './end/app.end';

//
//
import { DataService } from './step/data.service';

const appRoutes: Routes = [
    { path: 'start', component: AppStart },
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
    AppStep,
    AppEnd
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(){
        console.log('BrowserModule',BrowserModule);
    }
}
