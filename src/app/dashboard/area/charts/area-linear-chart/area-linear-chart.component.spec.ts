import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLinearChartComponent } from './area-linear-chart.component';

describe('AreaLinearChartComponent', () => {
  let component: AreaLinearChartComponent;
  let fixture: ComponentFixture<AreaLinearChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaLinearChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaLinearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
