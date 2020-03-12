import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {B5kDatepickerModule, B5kDatepickerConfig} from 'b5k-datepicker';
// import 'moment/locale/pl';



import { FormsModule } from '@angular/forms';
import {pl, enGB} from 'date-fns/locale';


const DatepickerConfig: B5kDatepickerConfig = {
  locale: enGB
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    B5kDatepickerModule.forRoot(DatepickerConfig),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
