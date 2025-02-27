import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericNotificationComponent } from './generic-notification.component';

describe('GenericNotificationComponent', () => {
  let component: GenericNotificationComponent;
  let fixture: ComponentFixture<GenericNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
