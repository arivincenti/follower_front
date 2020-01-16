import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from 'src/app/models/ticketModel';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-ticket-list-card',
  templateUrl: './ticket-list-card.component.html',
  styleUrls: ['./ticket-list-card.component.css']
})
export class TicketListCardComponent implements OnInit {

  @Input() ticket: TicketModel;
  @Input() user: UserModel;


  animation$: Observable<string[]>;
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);
  }

}
