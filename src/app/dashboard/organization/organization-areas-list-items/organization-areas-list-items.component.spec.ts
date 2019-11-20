import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAreasListItemsComponent } from './organization-areas-list-items.component';

describe('OrganizationAreasListItemsComponent', () => {
  let component: OrganizationAreasListItemsComponent;
  let fixture: ComponentFixture<OrganizationAreasListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAreasListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAreasListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
