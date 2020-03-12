# B5kDatepicker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.
Based on project [https://github.com/tomblachut/skimmed-datepicker](https://github.com/tomblachut/skimmed-datepicker)

## Demo

stackblitz

## Screenshots

![b5k-datepicker module](readme_files/Adnotacja 2020-03-12 002723.png)

## Features

- select only years, months or day
- popover or inline mode
- ngModel binding
- reactive forms

## Install

`npm i b5k-datepicker --save`

Import module

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {B5kDatepickerModule, B5kDatepickerConfig} from 'b5k-datepicker';


import { FormsModule } from '@angular/forms';
import {enGB} from 'date-fns/locale';


const DatepickerConfig: B5kDatepickerConfig = {
  locale: enGB
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    B5kDatepickerModule.forRoot(DatepickerConfig),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

```html
<input type="text" b5kDatepicker>
```

### Get selected date

- from event
  
  `<input type="text" b5kDatepicker (dateChange)="dateChangeEvent($event)">`

- ngModel

`<input type="text" b5kDatepicker [(ngModel)]="dateModel">`

- reactive Forms

`<input type="text" b5kDatepicker inlineMode=true formControlName="date">`

## Configuration

Global in module form root

```ts
const DatepickerConfig: B5kDatepickerConfig = {
  locale: enGB
}

@NgModule({
  declarations: [...],
  imports: [
    B5kDatepickerModule.forRoot(DatepickerConfig),
  ],
  bootstrap: [...]
})
export class AppModule { }
```

Localization

Datepicker localization is based on `date-fns`. Just import lang file into module.
Default language is english `enGB`. If you want to change language set it in global configuration of module.

```ts
import {enGB} from 'date-fns/locale';

const DatepickerConfig: B5kDatepickerConfig = {
  locale: enGB
}
```

## Options

| Property         | Type         | Default | Description                                                                                  |
|------------------|--------------|---------|----------------------------------------------------------------------------------------------|
| inlineMode       | boolean       | false   | Always visible  |
| modelFormatter   | function      | --       | Function you can format your resulted date, eg. in moment `moment(date).format('D MMMM YYYY'`. 0Returned date is js Date object.                                             |
| dayFormat	     | string      | d      | Day format in day view,     https://date-fns.org/v2.10.0/docs/format                                                                   |
|monthFormat | string | LLL | |
|headingFormat | string | LLLL y |
|weekStart|WeekDay|WeekDay.Monday| `import { WeekDay } from '@angular/common';`
|dayLabels|string[]||
|monthLabels|string[]||
|view|ViewMode|ViewMode.Days|`import { ViewMode } from './view-mode';`|
|selectOnlyMonths|boolean|false| With `view = ViewMode.Months` you can only select month.|
|selectOnlyYears|boolean|false||       

## Todo

- disable date/dates/date ranges/weekends/weekdays
- date range selection

## Development

Build library and watch for changes `ng build b5k-datepicker --watch`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## License

MIT