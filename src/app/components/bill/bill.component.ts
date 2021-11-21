import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit, OnChanges, OnDestroy {
  subs = new SubSink();
  subjectBill = new Subject<number>();
  subjectNumberOfPeople = new Subject<number>();
  subjectPercentage = new Subject<number>();
  subjectCustom = new Subject<number>();
  @Output() eventEmitter = new EventEmitter<Bill>();
  billValue: number = 0;
  numberOfPeopleValue: number = 1;
  percentageValue: number = 0;
  tipAmount: number;
  total: number;
  @Input() resetChangeCounter: number;
  @ViewChild('bill') bill: ElementRef;
  @ViewChild('numberOfPeople') numberOfPeople: ElementRef;
  @ViewChild('percentage') percentage: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.subs.sink = this.subjectBill
      .pipe(debounceTime(300))
      .subscribe((value) => {
        (this.billValue = value), this.calculate();
      });

    this.subs.sink = this.subjectNumberOfPeople
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value) (this.numberOfPeopleValue = value), this.calculate();
        else {
          this.numberOfPeopleValue = 1;
          this.calculate();
        }
      });

    this.subs.sink = this.subjectPercentage.subscribe((value) => {
      (this.percentageValue = value), this.calculate();
    });

    this.subs.sink = this.subjectCustom
      .pipe(debounceTime(300))
      .subscribe((value) => {
        (this.percentageValue = value), this.calculate();
      });
  }

  calculate(): void {
    this.tipAmount =
      (this.billValue * this.percentageValue) / 100 / this.numberOfPeopleValue;

    this.total = this.billValue / this.numberOfPeopleValue + this.tipAmount;

    this.eventEmitter.emit({ tipAmount: this.tipAmount, total: this.total });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetChangeCounter) {
      this.bill.nativeElement.value = '';
      this.numberOfPeople.nativeElement.value = '';
      this.percentage.nativeElement.value = '';
      this.billValue = 0;
      this.numberOfPeopleValue = 1;
      this.percentageValue = 0;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
