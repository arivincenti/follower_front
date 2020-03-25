import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { getOrganizations } from "../../../store/actions/userOrganizations/organizations/organizations.actions";
import { getTickets } from "../../../store/actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { OrganizationModel } from "src/app/models/organization.model";
import { OrganizationFormComponent } from "../../../shared/organization-form/organization-form.component";
import { MatDialog } from "@angular/material/dialog";
import { takeUntil, map } from "rxjs/operators";
import { TicketModel } from "src/app/models/ticketModel";
import { TicketFormComponent } from "../../../shared/ticket-form/ticket-form.component";
import { WebsocketService } from "src/app/services/websocket/websocket.service";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();
  organizations$: Observable<OrganizationModel[]>;
  organizationsLoading$: Observable<boolean>;

  tickets$: Observable<TicketModel[]>;
  ticketsLoading$: Observable<boolean>;
  user: UserModel;

  searchTicket: string = "";
  searchOrganization: string = "";

  //UI Observable
  animation$: Observable<string[]>;

  //Chart

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private _wsService: WebsocketService
  ) {}

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);

    var auth = JSON.parse(localStorage.getItem("auth"));
    this.user = auth.user;

    this.store.dispatch(getOrganizations({ payload: this.user._id }));
    this.store.dispatch(getTickets({ payload: this.user }));

    this._wsService
      .listen("new-ticket")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((res: TicketModel) => {
        this.store.dispatch(getTickets({ payload: this.user }));
      });

    //Observamos los cambios en los loaders de las organizaciones
    this.organizationsLoading$ = this.store.select(
      state => state.userOrganizations.organizations.loading
    );

    //Seleccionamos las organizaciones cuando hay cambios en el store
    this.organizations$ = this.store.select(
      state => state.userOrganizations.organizations.organizations
    );

    //Observamos los cambios en los loaders de los tickets
    this.ticketsLoading$ = this.store.select(
      state => state.userOrganizations.tickets.userTickets.loading
    );

    //Seleccionamos los tickets cuando cuando hay cambios en el store
    this.tickets$ = this.store.select(
      state => state.userOrganizations.tickets.userTickets.tickets
    );
  }

  createOrganization(): void {
    this.dialog.open(OrganizationFormComponent, {
      width: "600px",
      data: {
        organization: null,
        user: this.user
      }
    });
  }

  createTicket(): void {
    this.dialog.open(TicketFormComponent, {
      panelClass: ["ticket-dialog"],
      data: {
        organization: null,
        user: this.user
      }
    });
  }

  ngOnDestroy() {
    //Nos desuscribimos de los observables
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
