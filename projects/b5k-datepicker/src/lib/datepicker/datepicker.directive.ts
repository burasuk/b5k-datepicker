import { Directive, ViewContainerRef, ComponentFactoryResolver, Renderer2, ChangeDetectorRef, ElementRef, ComponentRef, HostListener, Input, OnInit, NgZone, OnDestroy, forwardRef, Output, EventEmitter } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ViewMode } from './view-mode';
import { WeekDay } from '@angular/common';

const NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDirective),
    multi: true
};


@Directive({
    selector: '[b5kDatepicker]',
    exportAs: 'b5kDatepicker',
    providers: [NGX_DP_VALUE_ACCESSOR]
})
export class DatePickerDirective implements OnInit, OnDestroy, ControlValueAccessor {

    private cRef: ComponentRef<DatepickerComponent> = null;

    private preventClose = true;

    private isOpen = false;

    @Input() date: Date;

    @Input() inlineMode = false;
    @Input() modelFormatter: (date: Date) => string;
    @Input() inputValueFormatter: (date: Date) => string;
    @Input() deselectEnabled: boolean;

    @Input() dayFormat = 'd';
    @Input() monthFormat = 'LLL';
    @Input() headingFormat = 'LLLL y';
    @Input() weekStart = WeekDay.Monday;

    @Input() view = ViewMode.Days;

    @Input() selectOnlyMonths = false;
    @Input() selectOnlyYears = false;
    @Output() dateChange = new EventEmitter<Date>();

    private documentClickEvent: () => void;

    onChangeCb: (_: any) => void = () => { };
    onTouchedCb: () => void = () => { };

    writeValue(date: Date): void {
        let formattedDate = date;
        if (this.modelFormatter) {
            const modelFormatter = this.modelFormatter.bind(this.elementRef);
            formattedDate = modelFormatter(date);
        }
        this.onChangeCb(formattedDate);
    }
    registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    constructor(
        private vcRef: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        private renderer: Renderer2,
        private zone: NgZone,
        private elementRef: ElementRef
    ) {

    }

    ngOnInit(): void {
        if (this.inlineMode) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'type', 'hidden');
            this.openCalendar();
        }
        if (this.date) {
            this.setInputValue(this.date);
            this.writeValue(this.date);
        }
    }

    @HostListener('click', ['$event']) onClick($event) {
        $event.preventDefault();

        if (!this.isOpen) {
            this.openCalendar();
            this.listenClickOutside();
            this.isOpen = true;
        } else {
            this.closeCalendar();
            this.isOpen = false;
            this.documentClickEvent();
        }
    }

    private listenClickOutside() {
        if (!this.inlineMode) {
            this.zone.runOutsideAngular(() => {

                this.documentClickEvent = this.renderer.listen('document', 'click', (event) => {
                    if (this.cRef !== null) {
                        const clickedInside = this.cRef.instance.elementRef.nativeElement.contains(event.target);
                        if (!clickedInside && !this.preventClose) {
                            this.zone.run(() => {
                                this.closeCalendar();
                                this.isOpen = false;
                                if (this.documentClickEvent) {
                                    this.documentClickEvent();
                                }
                            });
                        }
                    }
                });
            });
        }
    }


    public openCalendar(): void {

        this.preventClose = true;
        if (this.cRef === null) {
            this.cRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(DatepickerComponent));
            this.cRef.instance.inlineMode = this.inlineMode;
            this.cRef.instance.date = this.date;
            this.cRef.instance.dayFormat = this.dayFormat;
            this.cRef.instance.monthFormat = this.monthFormat;
            this.cRef.instance.headingFormat = this.headingFormat;
            this.cRef.instance.weekStart = this.weekStart;
            this.cRef.instance.view = this.view;
            this.cRef.instance.selectOnlyMonths = this.selectOnlyMonths;
            this.cRef.instance.selectOnlyYears = this.selectOnlyYears;
            this.cRef.instance.deselectEnabled = this.deselectEnabled;
            this.cRef.instance.dateChange.subscribe((date: Date) => {
                this.setInputValue(date);
                this.writeValue(date);
                this.date = date;
                if (!this.inlineMode) {
                    this.closeCalendar();
                }
                this.dateChange.emit(date);
            });
        }

        setTimeout(() => {
            this.preventClose = false;
        }, 50);

    }

    closeCalendar(): void {
        if (this.cRef !== null) {
            this.cRef.destroy();
            this.cRef = null;
            this.isOpen = false;
        }

    }

    private setInputValue(value: Date): void {
        let formattedDate = value;
        if (this.inputValueFormatter) {
            const inputValueFormatter = this.inputValueFormatter.bind(this.elementRef);
            formattedDate = inputValueFormatter(value);
        }
        this.elementRef.nativeElement.setAttribute('value', formattedDate);
    }

    ngOnDestroy(): void {
        this.closeCalendar();
        if(this.documentClickEvent) {
            this.documentClickEvent();
        }
    }
}
