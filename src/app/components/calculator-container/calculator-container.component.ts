import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../model/bill';

@Component({
  selector: 'app-calculator-container',
  templateUrl: './calculator-container.component.html',
  styleUrls: ['./calculator-container.component.css']
})
export class CalculatorContainerComponent implements OnInit {
  bill: Bill;
  @Input() resetChangeCounter: number;
  constructor() { }

  ngOnInit(): void {
  }

}
