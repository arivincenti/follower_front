import { Component, OnInit, Input } from "@angular/core";
import { NotificationModel } from "src/app/models/notificationModel";

@Component({
  selector: "app-notifications-list-card",
  templateUrl: "./notifications-list-card.component.html",
  styleUrls: ["./notifications-list-card.component.css"]
})
export class NotificationsListCardComponent implements OnInit {
  @Input() notification: NotificationModel;
  constructor() {}

  ngOnInit() {}
}
