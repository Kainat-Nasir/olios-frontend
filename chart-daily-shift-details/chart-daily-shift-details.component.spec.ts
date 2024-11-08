import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDailyShiftDetailsComponent } from './chart-daily-shift-details.component';

describe('ChartDailyShiftDetailsComponent', () => {
  let component: ChartDailyShiftDetailsComponent;
  let fixture: ComponentFixture<ChartDailyShiftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDailyShiftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDailyShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
