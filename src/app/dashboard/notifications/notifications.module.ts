import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NotificationsListComponent } from "./notifications-list/notifications-list.component";
import { NotificationsListCardComponent } from "./notifications-list-card/notifications-list-card.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationsListComponent,
    NotificationsListCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PipesModule,
    NotificationsRoutingModule,
    AngularMaterialModule
  ]
})
export class NotificationsModule {}
