import { BillComponent } from '../bill/bill.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorContainerComponent } from '../calculator-container/calculator-container.component';
import { HeaderComponent } from '../header/header.component';
import { TipComponent } from '../tip/tip.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    BillComponent,
    TipComponent,
    CalculatorContainerComponent
  ],
  exports: [
    HeaderComponent,
    BillComponent,
    TipComponent,
    CalculatorContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class CalculatorModule { }
