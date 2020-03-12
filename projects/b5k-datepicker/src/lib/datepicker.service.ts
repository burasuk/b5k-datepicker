import { Injectable, Inject } from '@angular/core';
import { B5kDatepickerConfig } from './B5kDatepickerConfig';
import { B5kDatepickerConfigService } from './B5kDatepickerConfigService';
import { enGB } from 'date-fns/locale';

@Injectable()
export class DatepickerService {

  config: B5kDatepickerConfig = {
    weekDayLabels: [],
    monthLabels: [],
    locale: enGB
  };

  constructor(@Inject(B5kDatepickerConfigService) private datepickerConfig: B5kDatepickerConfig) {
    this.config = {
      ...this.config,
      ...datepickerConfig,
    };
  }
}
