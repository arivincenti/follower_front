import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationModel } from "src/app/models/notificationModel";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-notifications-list",
  templateUrl: "./notifications-list.component.html",
  styleUrls: ["./notifications-list.component.css"]
})
export class NotificationsListComponent implements OnInit {
  notifications$: Observable<NotificationModel[]>;
  animation$: Observable<string[]>;

  searchNotification: string = "";
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.notifications$ = this.store.select(
      state => state.userOrganizations.notifications.notifications
    );
  }
}
