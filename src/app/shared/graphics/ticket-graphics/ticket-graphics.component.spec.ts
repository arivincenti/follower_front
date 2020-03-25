import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGraphicsComponent } from './ticket-graphics.component';

describe('TicketGraphicsComponent', () => {
  let component: TicketGraphicsComponent;
  let fixture: ComponentFixture<TicketGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
