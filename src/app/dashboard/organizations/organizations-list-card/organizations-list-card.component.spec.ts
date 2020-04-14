import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrganizationsListCardComponent } from "./organizations-list-card.component";

describe("OrganizationListCardComponent", () => {
  let component: OrganizationsListCardComponent;
  let fixture: ComponentFixture<OrganizationsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsListCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
