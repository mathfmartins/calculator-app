import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css'],
})
export class TipComponent implements OnInit {
  @Input() tipAmount: number;
  @Input() total: number;
  resetChangeCounter = 0;
  constructor() {}

  ngOnInit(): void {}

  reset() {
    this.tipAmount = 0.0;
    this.total = 0.0;
    this.resetChangeCounter++;
  }
}
