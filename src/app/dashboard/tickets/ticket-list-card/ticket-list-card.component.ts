import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { TicketModel } from "src/app/models/ticketModel";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { Router } from "@angular/router";

@Component({
  selector: "app-ticket-list-card",
  templateUrl: "./ticket-list-card.component.html",
  styleUrls: ["./ticket-list-card.component.css"],
})
export class TicketListCardComponent implements OnInit, OnChanges {
  @Input() ticket: TicketModel;
  @Input() user: UserModel;

  isFollower: boolean = false;
  dateNow: Date = new Date();

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    let follower = this.ticket.followers.find(
      (follower) => follower._id === this.user._id
    );

    if (follower === undefined) {
      this.isFollower = false;
    } else {
      this.isFollower = true;
    }
  }

  ticketDetail(ticket: TicketModel) {
    this.router.navigate([`${this.router.url}/ticket`, ticket._id]);
  }
}
