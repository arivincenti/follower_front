import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsListCardComponent } from './notifications-list-card.component';

describe('NotificationsListCardComponent', () => {
  let component: NotificationsListCardComponent;
  let fixture: ComponentFixture<NotificationsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
