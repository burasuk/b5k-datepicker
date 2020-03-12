import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { DatepickerService } from '../datepicker.service';

@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {

    constructor(private datepickerService: DatepickerService) {

    }
    transform(timestamp: number, headingFormat: string): string {
        const date = new Date(timestamp);
        return format(date, headingFormat, { locale: this.datepickerService.config.locale });
    }
}
