import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAreasListComponent } from './member-areas-list.component';

describe('MemberAreasListComponent', () => {
  let component: MemberAreasListComponent;
  let fixture: ComponentFixture<MemberAreasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAreasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
