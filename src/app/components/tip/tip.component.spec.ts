import { TipComponent } from './tip.component';
import { BillComponent } from './../bill/bill.component';
import { CalculatorModule } from './../calculator/calculator.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe(`${TipComponent.name}`, () => {
  let component: TipComponent;
  let fixture: ComponentFixture<TipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${TipComponent.prototype.reset.name}
        should reset (@Input tipAmount), @Input total) and increment resetChangeCounter`, () => {
    component.reset();

    expect(component.tipAmount).toBe(0);
    expect(component.total).toBe(0);
    expect(component.resetChangeCounter).toBeGreaterThanOrEqual(1);
  });
});
