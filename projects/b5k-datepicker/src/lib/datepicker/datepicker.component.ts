import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { WeekDay } from '@angular/common';
import { isValidDate, noop, startOfDay } from '../util/helpers';
import { ViewMode } from './view-mode';
import { ZoomDirection } from '../util/zoom.animation';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'skm-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss', '../datepicker.shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showCalendar', [
      transition(':enter', [
        style({ transform: 'translateY(5px)', opacity: 0 }),
        animate('0.25s ease')
      ])
    ])
  ]
})
export class DatepickerComponent implements  OnChanges, OnInit {

  @Input() set date(dirtyDate: Date | number) {
    if (dirtyDate == null) {
      this.selectedTimestamp = undefined;
      return;
    }
    const date = startOfDay(dirtyDate);
    if (date.getTime() !== this.selectedTimestamp) {
      this.selectedTimestamp = isValidDate(date) ? date.getTime() : undefined;
      if (typeof this.selectedTimestamp !== 'undefined') {
        this.initialTimestamp = this.selectedTimestamp;
        this.view = ViewMode.Days;
      }
    }
  }

  @Output() dateChange = new EventEmitter<Date>();

  @Input() set min(dirtyDate: Date | number) {
    const date = startOfDay(dirtyDate);
    this.minTimestamp = isValidDate(date) ? date.valueOf() : undefined;
  }

  @Input() set max(dirtyDate: Date | number) {
    const date = startOfDay(dirtyDate);
    this.maxTimestamp = isValidDate(date) ? date.valueOf() : undefined;
  }

  @Input() deselectEnabled: boolean;

  @Input() dayFormat: string;
  @Input() monthFormat: string;
  yearFormat = 'y';
  @Input() headingFormat: string;
  @Input() weekStart = WeekDay.Monday;

  @Input() dayLabels: string[];
  weekDayLabels: string[];
  @Input() monthLabels: string[];

  @Input() view = ViewMode.Days;

  @Input() selectOnlyMonths = false;
  @Input() selectOnlyYears = false;

  @Input() inlineMode = false;


  initialTimestamp: number;
  currentTimestamp: number;
  selectedTimestamp: number;
  minTimestamp: number;
  maxTimestamp: number;

  zoomDirection: ZoomDirection;
  readonly ViewMode = ViewMode;

  constructor(
    private cd: ChangeDetectorRef,
    public elementRef: ElementRef,
    private datepickerService: DatepickerService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('weekDayLabels' in changes) {
      this.weekDayLabels =  [...Array(7).keys()].map(i => this.datepickerService.config.locale.localize.day(i, { width: 'short' }));
    }
  }

  ngOnInit(): void {
    this.currentTimestamp = startOfDay(new Date()).getTime();
    this.initialTimestamp = this.selectedTimestamp || this.currentTimestamp;
    this.weekDayLabels = [...Array(7).keys()].map(i => this.datepickerService.config.locale.localize.day(i, { width: 'short' }));
  }

  selectDay(timestamp: number | undefined): void {
    this.selectedTimestamp = timestamp;
    const date = (typeof timestamp !== 'undefined') ? new Date(timestamp) : undefined;
    this.dateChange.emit(date);
  }

  switchView(timestamp: number, view: ViewMode, direction: ZoomDirection) {
    if (this.selectOnlyMonths && view === ViewMode.Days) {
      this.selectDay(timestamp);
    } else if ( this.selectOnlyYears && view === ViewMode.Months) {
      this.selectDay(timestamp);
    } else {
      this.zoomDirection = direction;
      setTimeout(() => {
        this.initialTimestamp = timestamp;
        this.view = view;
        this.cd.markForCheck();
      });
    }
  }


}
