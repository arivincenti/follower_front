import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProfileComponent } from './area-profile.component';

describe('AreaProfileComponent', () => {
  let component: AreaProfileComponent;
  let fixture: ComponentFixture<AreaProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
