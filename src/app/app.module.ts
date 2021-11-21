import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BillComponent } from './components/bill/bill.component';
import { TipComponent } from './components/tip/tip.component';
import { CalculatorContainerComponent } from './components/calculator-container/calculator-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillComponent,
    TipComponent,
    CalculatorContainerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
