import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUserAreasListComponent } from './organization-user-areas-list.component';

describe('OrganizationUserAreasListComponent', () => {
  let component: OrganizationUserAreasListComponent;
  let fixture: ComponentFixture<OrganizationUserAreasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationUserAreasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUserAreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
