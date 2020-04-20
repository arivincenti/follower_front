import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { OrganizationModel } from "src/app/models/organization.model";
import { OrganizationFormComponent } from "../../../shared/forms/organization-form/organization-form.component";
import { MatDialog } from "@angular/material/dialog";
import { TicketModel } from "src/app/models/ticketModel";
import { TicketFormComponent } from "../../../shared/forms/ticket-form/ticket-form.component";
import {
  organizations,
  organizationsLoading,
} from "src/app/store/selectors/userOrganizations/organizations/organizations.selector";
import {
  userTickets,
  userTicketsLoading,
} from "src/app/store/selectors/userOrganizations/tickets/tickets/tickets.selector";
import { user } from "src/app/store/selectors/auth/auth.selector";
import { organizationLoading } from "src/app/store/selectors/userOrganizations/organization/organization/organization.selector";

@Component({
  selector: "app-organization",
  templateUrl: "./organizations.component.html",
  styleUrls: ["./organizations.component.css"],
})
export class OrganizationsComponent implements OnInit, OnDestroy {
  organizations$: Observable<OrganizationModel[]>;
  organizationsLoading$: Observable<boolean>;
  organizationLoading$: Observable<boolean>;

  tickets$: Observable<TicketModel[]>;
  ticketsLoading$: Observable<boolean>;
  user$: Observable<UserModel>;
  user: UserModel;
  auth: any;

  searchTicket: string = "";
  searchOrganization: string = "";

  //UI Observable

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.user = this.auth.user;
    this.user$ = this.store.select(user);
    this.organizationsLoading$ = this.store.select(organizationsLoading);
    this.organizations$ = this.store.select(organizations);
    this.ticketsLoading$ = this.store.select(userTicketsLoading);
    this.organizationLoading$ = this.store.select(organizationLoading);
    this.tickets$ = this.store.select(userTickets);
  }

  createOrganization(): void {
    this.dialog.open(OrganizationFormComponent, {
      width: "600px",
      data: {
        organization: null,
        user: this.user,
      },
    });
  }

  createTicket(): void {
    this.dialog.open(TicketFormComponent, {
      panelClass: ["ticket-dialog"],
      data: {
        organization: null,
        user: this.user,
      },
    });
  }

  ngOnDestroy() {}
}
