import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListCardComponent } from './ticket-list-card.component';

describe('TicketListCardComponent', () => {
  let component: TicketListCardComponent;
  let fixture: ComponentFixture<TicketListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
