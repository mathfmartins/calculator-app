import { CalculatorModule } from './../calculator/calculator.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillComponent } from './bill.component';

describe(`${BillComponent.name}`, () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${BillComponent.prototype.calculate.name} should calculate tip amount when called`, () => {
    component.billValue = 100;
    component.percentageValue = 5;
    component.calculate();
    expect(component.tipAmount).toBe(5);
  });

  it(`#${BillComponent.prototype.calculate.name} should calculate tip amount when number of people input is more than one`, () => {
    component.billValue = 1000;
    component.percentageValue = 10;
    component.numberOfPeopleValue = 4;
    component.calculate();
    expect(component.tipAmount).toBe(25);
  });

  it(`#${BillComponent.prototype.reset.name} should reset billInput, numberOfPeopleInput, percentageValue and customInput values`, () => {
    component.reset();
    expect(component.billInput.value).toBe(0);
    expect(component.numberOfPeopleInput.value).toBe(1);
    expect(component.percentageValue).toBe(0);
    expect(component.customInput.value).toBe('');
  });

  it('Should go to default switch case when subjectPercentage value is not 2, 5, 10, 15 or 25', (done) => {
    fixture.detectChanges();
    component.subjectPercentage.subscribe(() => {
      expect(component.twoButton).toBe(false);
      expect(component.fiveButton).toBe(false);
      expect(component.tenButton).toBe(false);
      expect(component.feefteenButton).toBe(false);
      expect(component.twentyfiveButton).toBe(false);
      done();
    });
    component.subjectPercentage.next(0);
  });

  it(`Should emit 2 when clicked on 2% button`, (done) => {
    fixture.detectChanges();
    component.subjectPercentage.subscribe(() => {
      expect(component.twoButton).toBe(true);
      done();
    });

    component.subjectPercentage.next(2);
  });

  it('Should emit 5 when clicked on 5% button', (done) => {
    fixture.detectChanges();

    component.subjectPercentage.subscribe(() => {
      expect(component.fiveButton).toBe(true);
      done();
    });

    component.subjectPercentage.next(5);
  });

  it('Should emit 10 when clicked on 10% button', (done) => {
    fixture.detectChanges();
    component.subjectPercentage.subscribe(() => {
      expect(component.tenButton).toBe(true);
      done();
    });

    component.subjectPercentage.next(10);
  });

  it('Should emit 15 when clicked on 15% button', (done) => {
    fixture.detectChanges();
    component.subjectPercentage.subscribe(() => {
      expect(component.feefteenButton).toBe(true);
      done();
    });

    component.subjectPercentage.next(15);
  });

  it('Should emit 25 when clicked on 25% button', (done) => {
    fixture.detectChanges();
    component.subjectPercentage.subscribe(() => {
      expect(component.twentyfiveButton).toBe(true);
      done();
    });

    component.subjectPercentage.next(25);
  });
});
