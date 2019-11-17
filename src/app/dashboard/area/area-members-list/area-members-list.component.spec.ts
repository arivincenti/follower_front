import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMembersListComponent } from './area-members-list.component';

describe('AreaMembersListComponent', () => {
  let component: AreaMembersListComponent;
  let fixture: ComponentFixture<AreaMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
