import { Component, OnInit, Input } from "@angular/core";
import { NotificationModel } from "src/app/models/notificationModel";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-notifications-list-card",
  templateUrl: "./notifications-list-card.component.html",
  styleUrls: ["./notifications-list-card.component.css"],
})
export class NotificationsListCardComponent implements OnInit {
  animation$: Observable<string[]>;

  @Input() notification: NotificationModel;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.animation$ = this.store.select((state) => state.ui.animated);
  }
}
