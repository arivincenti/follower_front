import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationsRoutingModule } from "./notifications-routing.module";

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, SharedModule, NotificationsRoutingModule]
})
export class NotificationsModule {}
