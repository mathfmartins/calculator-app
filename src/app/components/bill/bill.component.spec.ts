import { CalculatorModule } from './../calculator/calculator.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillComponent } from './bill.component';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate tip amount when called', () => {
    component.billValue = 100;
    component.percentageValue = 5;
    component.calculate();
    expect(component.tipAmount).toBe(5);
  })

  it('should calculate tip amount when number of people input is more than one', () => {
    component.billValue = 1000;
    component.percentageValue = 10;
    component.numberOfPeopleValue = 4;
    component.calculate();
    expect(component.tipAmount).toBe(25)
  })
});
