import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMembersListItemComponent } from './area-members-list-item.component';

describe('AreaMembersListItemComponent', () => {
  let component: AreaMembersListItemComponent;
  let fixture: ComponentFixture<AreaMembersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMembersListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMembersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
