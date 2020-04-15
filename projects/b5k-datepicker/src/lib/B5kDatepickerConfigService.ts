import { Injectable } from '@angular/core';
import { enGB } from 'date-fns/locale';
import { Subject } from 'rxjs';

@Injectable()
export class B5kDatepickerConfigService {


  public localeChanged: Subject<never> = new Subject();
  private locale$: Locale | undefined;

  locale(): Locale | undefined {
    return this.locale$;
  }

  setLocale(locale: Locale | undefined): void {
    this.locale$ = locale;
    this.localeChanged.next();
  }

}