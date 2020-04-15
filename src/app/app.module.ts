import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import 'moment/locale/pl';



import { FormsModule } from '@angular/forms';
import {pl, enGB} from 'date-fns/locale';
import { B5kDatepickerModule, B5kDatepickerConfigService } from 'b5k-datepicker';



const DatepickerConfig = new B5kDatepickerConfigService();
DatepickerConfig.setLocale(enGB);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    B5kDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: B5kDatepickerConfigService,
      useValue: DatepickerConfig
    }
  ]
})
export class AppModule { }
