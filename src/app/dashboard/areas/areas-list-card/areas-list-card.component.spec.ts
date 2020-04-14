import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasListCardComponent } from './areas-list-card.component';

describe('AreasListCardComponent', () => {
  let component: AreasListCardComponent;
  let fixture: ComponentFixture<AreasListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
