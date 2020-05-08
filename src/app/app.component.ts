import { Component } from '@angular/core';
import * as moment from 'moment';
import { ViewMode } from 'b5k-datepicker';

@Component({
  selector: 'b5k-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'b5k-datepicker-demo';
  view = ViewMode.Months;
  view2 = ViewMode.Days;
  viewYears = ViewMode.Years;

  model: string;
  yearModel: string;
  monthModel: string;
  inlineModel: string;

  selectedDate = new Date(2020, 2, 20);

  selectedMonth = new Date(2020, 1, 20);


  // use fat arrow to keep context
  modelFormatter(date) {
    return moment(date).format('Do MMMM YYYY');
  }

  inputValueFormatter(date) {
    return moment(date).format('D MMMM YYYY');
  }

  // or use normal function if you dont need right context
  monthModelFormatter(date) {
    return moment(date).format('MMMM YYYY');
  }
  yearModelFormatter(date) {
    return moment(date).format('YYYY');
  }

}
