import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from 'src/app/models/ticketModel';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @Input() tickets: TicketModel[];
  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
