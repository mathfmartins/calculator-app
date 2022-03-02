import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { SubSink } from 'subsink';

interface ButtonParameters {
  twoButton?: boolean;
  tenButton?: boolean;
  fiveButton?: boolean;
  feefteenButton?: boolean;
  twentyfiveButton?: boolean;
}

const TYPING_TIME = 300;
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  billInput = new FormControl();
  numberOfPeopleInput = new FormControl();
  customInput = new FormControl();
  subjectPercentage = new Subject<number>();
  billValue: number = 0;
  numberOfPeopleValue: number = 1;
  percentageValue: number = 0;
  tipAmount: number;
  twoButton: boolean;
  fiveButton: boolean;
  tenButton: boolean;
  feefteenButton: boolean;
  twentyfiveButton: boolean;
  total: number;
  @Input() resetChangeCounter: number;

  constructor() {}

  ngOnInit(): void {
    this.subs.sink = this.billInput.valueChanges
      .pipe(debounceTime(TYPING_TIME))
      .subscribe((value) => {
        (this.billValue = value), this.calculate();
      });

    this.subs.sink = this.numberOfPeopleInput.valueChanges
      .pipe(debounceTime(TYPING_TIME))
      .subscribe((value) => {
        if (value) (this.numberOfPeopleValue = value), this.calculate();
        else {
          this.numberOfPeopleValue = 1;
          this.calculate();
        }
      });

    this.subs.sink = this.subjectPercentage.subscribe((value) => {
      (this.percentageValue = value), this.calculate();
      switch (this.percentageValue) {
        case 2:
          this.buttonActivate({ twoButton: true });
          break;
        case 5:
          this.buttonActivate({ fiveButton: true });
          break;
        case 10:
          this.buttonActivate({ tenButton: true });
          break;
        case 15:
          this.buttonActivate({ feefteenButton: true });
          break;
        case 25:
          this.buttonActivate({ twentyfiveButton: true });
          break;
        default:
          this.buttonActivate({
            twoButton: false,
            fiveButton: false,
            tenButton: false,
            feefteenButton: false,
            twentyfiveButton: false,
          });
          break;
      }
    });

    this.subs.sink = this.customInput.valueChanges
      .pipe(debounceTime(TYPING_TIME))
      .subscribe((value) => {
        (this.percentageValue = value), this.twoButton;
        this.buttonActivate({
          twoButton: false,
          fiveButton: false,
          tenButton: false,
          feefteenButton: false,
          twentyfiveButton: false,
        });
        this.calculate();
      });
  }

  calculate(): void {
    this.tipAmount =
      (this.billValue * this.percentageValue) / 100 / this.numberOfPeopleValue;

    this.total = this.billValue / this.numberOfPeopleValue + this.tipAmount;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetChangeCounter) {
      this.reset();
    }
  }

  reset(): void {
    this.billInput.setValue(0);
    this.numberOfPeopleInput.setValue(1);
    this.percentageValue = 0;
    this.customInput.setValue('');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buttonActivate({
    twoButton = false,
    tenButton = false,
    fiveButton = false,
    feefteenButton = false,
    twentyfiveButton = false,
  }: ButtonParameters): void {
    this.twoButton = twoButton;
    this.tenButton = tenButton;
    this.fiveButton = fiveButton;
    this.feefteenButton = feefteenButton;
    this.twentyfiveButton = twentyfiveButton;
  }
}
