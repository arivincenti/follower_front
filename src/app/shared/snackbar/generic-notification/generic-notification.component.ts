import { Component, OnInit, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material";

@Component({
  selector: "app-generic-notification",
  templateUrl: "./generic-notification.component.html",
  styleUrls: ["./generic-notification.component.css"]
})
export class GenericNotificationComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}
}
