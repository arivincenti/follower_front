import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberProfileComponent } from "./member-profile/member-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MemberListComponent } from "./member-list/member-list.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { MemberListCardComponent } from "./member-list-card/member-list-card.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { GenericNotificationComponent } from "../../shared/snackbar/generic-notification/generic-notification.component";

@NgModule({
  declarations: [
    MemberProfileComponent,
    MemberListComponent,
    MemberListCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    PipesModule,
  ],
  exports: [MemberListComponent, MemberListCardComponent],
  entryComponents: [GenericNotificationComponent],
})
export class MemberModule {}
