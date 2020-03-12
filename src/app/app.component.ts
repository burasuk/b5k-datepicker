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
  monthLabels = moment.monthsShort('-MMM-');
  weekDayLabels = moment.weekdaysShort();
  view = ViewMode.Months;
  view2 = ViewMode.Days;
  viewYears = ViewMode.Years;

  model: string;
  yearModel: string;
  monthModel: string;
  inlineModel: string;


  modelFormatter(date) {
    return moment(date).format('D MMMM YYYY');
  }
  monthModelFormatter(date) {
    return moment(date).format('MMMM YYYY');
  }
  yearModelFormatter(date) {
    return moment(date).format('YYYY');
  }

}
