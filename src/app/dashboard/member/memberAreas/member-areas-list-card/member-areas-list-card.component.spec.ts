import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAreasListCardComponent } from './member-areas-list-card.component';

describe('MemberAreasListCardComponent', () => {
  let component: MemberAreasListCardComponent;
  let fixture: ComponentFixture<MemberAreasListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAreasListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAreasListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
