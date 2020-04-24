import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FilterComponent } from "./filter/filter.component";
import { OrganizationFormComponent } from "./forms/organization-form/organization-form.component";
import { AreaFormComponent } from "./forms/area-form/area-form.component";
import { MemberFormComponent } from "./forms/member-form/member-form.component";
import { TicketFormComponent } from "./forms/ticket-form/ticket-form.component";
import { MatPaginatorIntl } from "@angular/material";
import { CustomMatPaginatorIntl } from "./paginatorCustom/paginatorCustom";
import { TicketGraphicsComponent } from "./graphics/ticket-graphics/ticket-graphics.component";
import { PipesModule } from "../pipes/pipes.module";
import { UpdatedNotificationComponent } from "./snackbar/updated-notification/updated-notification.component";
import { GenericNotificationComponent } from "./snackbar/generic-notification/generic-notification.component";
import { AreaMemberFormComponent } from "./forms/areaMemberForm/area-member-form.component";
import { ChartsModule } from "ng2-charts";

const shared = [
  FooterComponent,
  FilterComponent,
  OrganizationFormComponent,
  AreaFormComponent,
  MemberFormComponent,
  AreaMemberFormComponent,
  TicketFormComponent,
  TicketGraphicsComponent,
  UpdatedNotificationComponent,
  GenericNotificationComponent,
];
@NgModule({
  declarations: shared,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PipesModule,
  ],
  exports: shared,
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class SharedModule {}
