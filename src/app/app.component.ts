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
  yearModel = new Date(2020, 2, 23);
  monthModel = new Date(2020, 2, 22);
  inlineModel = new Date(2020, 2, 21);

  selectedDate = new Date(2020, 2, 20);

  selectedMonth = new Date(2020, 1, 20);


  inputValueFormatter(date) {
    return moment(date).format('D MMMM YYYY');
  }


}
