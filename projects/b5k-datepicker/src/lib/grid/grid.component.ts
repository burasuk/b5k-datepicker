import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Pane } from '../pane';
import { SliderComponent } from '../slider/slider.component';
import { ViewStrategy } from '../view-strategies/view-strategy';
import { ViewComponent } from '../view/view.component';
import { ViewMode } from '../datepicker/view-mode';

@Component({
  selector: 'skm-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['../datepicker.shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnChanges {

  private _pane: Pane;

  @Input() set pane(pane: Pane) {
    const date = new Date(pane.values[0]);
    this.sundays = this.getSundays(date);
    this.saturdays = this.getSaturdays(date);
    this._pane = pane;
  }
  get pane() {
    return this._pane;
  }

  @Input() viewMode: ViewMode;

  @Input() currentTimestamp: number;

  @Input() selectedTimestamp: number;
  @Input() minTimestamp: number;
  @Input() maxTimestamp: number;

  @Input() itemFormat: string;
  @Input() itemLabels: string[] = [];

  @HostBinding('class') readonly _hostClass = 'skm-datepicker-content';

  sundays: number[];
  saturdays: number[];

  constructor(readonly slider: SliderComponent,
    readonly parentView: ViewComponent,
    private readonly viewStrategy: ViewStrategy) {
  }




  ngOnChanges(changes: SimpleChanges): void {
    if ('itemLabels' in changes) {
      this.itemLabels = this.itemLabels || [];
    }
  }

  makeItemClasses(index: number, pane: Pane): string {

    return [
      this.viewStrategy.itemClass,
      'skm-datepicker-item',
      (pane.values[index] === this.currentTimestamp) ? 'skm-datepicker-current' : '',
      (pane.values[index] === this.selectedTimestamp) ? 'skm-datepicker-selected' : '',
      (this.isDayMode(this.viewMode) ?
        (this.isSunday(pane.values[index], this.sundays) ? 'sunday' : '') :
        ''),
      (this.isDayMode(this.viewMode) ?
        (this.isSaturday(pane.values[index], this.saturdays) ? 'saturday' : '') :
        '')
    ].join(' ');
  }

  isDayMode(viewMode: ViewMode): boolean {
    return (viewMode === ViewMode.Days);
  }

  isSunday(timestamp: number, sundays: number[]): boolean {
    return sundays.includes(Math.round(timestamp / 1000));
  }
  isSaturday(timestamp: number, saturdays: number[]): boolean {
    return saturdays.includes(Math.round(timestamp / 1000));
  }

  getSaturdays(date: Date): number[] {
    const saturday = [];
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const newDate = new Date(date.getFullYear(), date.getMonth(), i);
      if (newDate.getDay() === 6) {
        saturday.push(Math.round(newDate.getTime() / 1000));
      }
    }

    return saturday;
  }

  getSundays(d: Date): number[] {
    const sundays = [];
    // looping through days in month
    const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const newDate = new Date(d.getFullYear(), d.getMonth(), i);
      // if Sunday
      if (newDate.getDay() === 0) {
        sundays.push(Math.round(newDate.getTime() / 1000));
      }
    }
    return sundays;
  }

  isDisabled(index: number, pane: Pane): boolean {
    return (pane.values[index] < this.minTimestamp) || (pane.values[index] > this.maxTimestamp);
  }

  trackIndex(index: number): number {
    return index;
  }

}
