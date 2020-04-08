import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationModel } from "src/app/models/notificationModel";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<NotificationModel[]>;
  animation$: Observable<string[]>;

  searchNotification: string = "";

  //Paginator variables
  pageIndex: number = 0;
  pageSize: number = 10;
  since: number;
  until: number;
  pageSizeOptions: number[] = [10, 15, 20, 50];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.animation$ = this.store.select((state) => state.ui.animated);

    this.notifications$ = this.store.select(
      (state) => state.userOrganizations.notifications.notifications
    );

    this.animation$ = this.store.select((state) => state.ui.animated);
    this.since = this.pageIndex;
    this.until = this.pageSize;
  }

  // ==================================================
  // Set paginator page size
  // ==================================================
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(",")
      .map((str) => +str);
  }

  // ==================================================
  // Change Page
  // ==================================================
  changePage($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    this.since = this.pageIndex * this.pageSize;

    if (this.pageIndex) {
      this.until = this.pageIndex * this.pageSize + this.pageSize;
    } else {
      this.until = this.pageSize;
    }
  }
}
