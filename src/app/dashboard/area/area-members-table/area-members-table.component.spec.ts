import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMembersTableComponent } from './area-members-table.component';

describe('AreaMembersTableComponent', () => {
  let component: AreaMembersTableComponent;
  let fixture: ComponentFixture<AreaMembersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMembersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
