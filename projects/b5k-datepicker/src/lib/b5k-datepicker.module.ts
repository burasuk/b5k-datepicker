import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { SliderComponent } from './slider/slider.component';
import { ViewComponent } from './view/view.component';
import { GridComponent } from './grid/grid.component';
import { DaysStrategyDirective } from './view-strategies/days-strategy.directive';
import { MonthsStrategyDirective } from './view-strategies/months-strategy.directive';
import { YearsStrategyDirective } from './view-strategies/years-strategy.directive';
import { DatePickerDirective } from './datepicker/datepicker.directive';
import { B5kDatepickerConfigService } from './B5kDatepickerConfigService';
import { DateFormat } from './pipes/date-format.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DatepickerComponent,
    ViewComponent,
    SliderComponent,
    GridComponent,
    DaysStrategyDirective,
    MonthsStrategyDirective,
    YearsStrategyDirective,
    DatePickerDirective,
    DateFormat
  ],
  entryComponents: [DatepickerComponent],
  exports: [
    DatePickerDirective
  ],
})
export class B5kDatepickerModule {
  static forRoot(): ModuleWithProviders<B5kDatepickerModule>  {
    return {
      ngModule: B5kDatepickerModule,
      providers: [B5kDatepickerConfigService]
    };
  }
}
