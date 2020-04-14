import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMembersListCardComponent } from './area-members-list-card.component';

describe('AreaMembersListCardComponent', () => {
  let component: AreaMembersListCardComponent;
  let fixture: ComponentFixture<AreaMembersListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMembersListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMembersListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
