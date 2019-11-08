import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAreasListComponent } from './organization-areas-list.component';

describe('OrganizationAreasListComponent', () => {
  let component: OrganizationAreasListComponent;
  let fixture: ComponentFixture<OrganizationAreasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAreasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
