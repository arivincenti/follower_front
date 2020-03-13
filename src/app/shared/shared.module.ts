import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { FilterComponent } from "./filter/filter.component";
import { StateFilterCounterPipe } from "../pipes/filter/state-filter-counter.pipe";
import { AreasPaginatorPipe } from "../pipes/areas/areas-paginator.pipe";
import { ImagePipe } from "../pipes/image/image.pipe";
import { MemberPaginatorPipe } from "../pipes/members/member-paginator.pipe";
import { TicketPaginatorPipe } from "../pipes/tickets/ticket-paginator.pipe";
import { OrganizationPaginatorPipe } from "../pipes/organizations/organization-paginator.pipe";
import { TimePipe } from "../pipes/time/time.pipe";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { OrganizationFormComponent } from "./organization-form/organization-form.component";

@NgModule({
  declarations: [
    FooterComponent,
    FilterComponent,
    StateFilterCounterPipe,
    AreasPaginatorPipe,
    MemberPaginatorPipe,
    ImagePipe,
    TicketPaginatorPipe,
    OrganizationPaginatorPipe,
    TimePipe,
    SnackbarComponent,
    OrganizationFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    FooterComponent,
    FilterComponent,
    AreasPaginatorPipe,
    MemberPaginatorPipe,
    ImagePipe,
    TicketPaginatorPipe,
    OrganizationPaginatorPipe,
    TimePipe,
    SnackbarComponent,
    OrganizationFormComponent
  ]
})
export class SharedModule {}
