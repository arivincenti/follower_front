import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedNotificationComponent } from './updated-notification.component';

describe('UpdatedNotificationComponent', () => {
  let component: UpdatedNotificationComponent;
  let fixture: ComponentFixture<UpdatedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
