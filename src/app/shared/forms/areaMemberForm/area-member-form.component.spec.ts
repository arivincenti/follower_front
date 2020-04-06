import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMemberFormComponent } from './area-member-form.component';

describe('AreaMemberFormComponent', () => {
  let component: AreaMemberFormComponent;
  let fixture: ComponentFixture<AreaMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
