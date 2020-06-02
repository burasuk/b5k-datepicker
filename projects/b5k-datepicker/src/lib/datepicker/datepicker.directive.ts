import {
    Directive,
    ViewContainerRef,
    ComponentFactoryResolver,
    Renderer2,
    ElementRef,
    ComponentRef,
    HostListener,
    Input,
    OnInit,
    NgZone,
    OnDestroy,
    forwardRef,
    Output,
    EventEmitter
} from '@angular/core';
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

    private date: Date;

    @Input() inlineMode = false;
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

    public disabled: boolean;
    onChange: any = () => { };
    onTouch: any = () => { };

    /**
     * Write a value to the input
     * @param date Date
     */
    writeValue(date: Date): void {
        if (date) {
            this.date = date;
            this.onChange(date);
            this.setInputValue(this.date);
            if (this.cRef !== null) {
                this.cRef.instance.date = this.date;
            }
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
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
                this.writeValue(date);
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
        if (this.documentClickEvent) {
            this.documentClickEvent();
        }
    }
}
