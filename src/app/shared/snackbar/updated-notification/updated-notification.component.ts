import { Component, OnInit, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material";

@Component({
  selector: "app-updated-notification",
  templateUrl: "./updated-notification.component.html",
  styleUrls: ["./updated-notification.component.css"],
})
export class UpdatedNotificationComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}
}
