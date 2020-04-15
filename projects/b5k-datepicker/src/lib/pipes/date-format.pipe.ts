import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { B5kDatepickerConfigService } from '../B5kDatepickerConfigService';

@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {

    constructor(private b5kDatepickerConfigService: B5kDatepickerConfigService) {

    }
    transform(timestamp: number, headingFormat: string): string {
        const date = new Date(timestamp);
        return format(date, headingFormat, { locale: this.b5kDatepickerConfigService.locale() });
    }
}
