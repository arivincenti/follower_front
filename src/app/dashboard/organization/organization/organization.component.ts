import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as OrganizationsActions from "../../../store/actions/userOrganizations/organizations/organizations.actions";
import * as TicketsActions from "../../../store/actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { OrganizationModel } from "src/app/models/organization.model";
import { OrganizationFormComponent } from "../organization-form/organization-form.component";
import { MatDialog } from "@angular/material";
import { filter, takeUntil } from "rxjs/operators";
import { TicketModel } from "src/app/models/ticketModel";
import { TicketFormComponent } from "../../ticket/ticket-form/ticket-form.component";
import { OrganizationsService } from "src/app/services/organizations/organizations.service";
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
  organizationsLoaded$: Observable<boolean>;

  tickets$: Observable<TicketModel[]>;
  ticketsLoading$: Observable<boolean>;
  ticketsLoaded$: Observable<boolean>;
  user: UserModel;

  //UI Observable
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private _organizationsService: OrganizationsService,
    private wsService: WebsocketService
  ) {}

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);

    //Escuchamos as actualizaciones en los tickets
    this.wsService
      .listen("update-ticket")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(res => {
        this.store.dispatch(TicketsActions.getTickets({ payload: this.user }));
      });

    //Escuchamos las actualizaciones en las organizaciones
    this._organizationsService
      .getUpdateBySocket()
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(msg => {
        this.store.dispatch(
          OrganizationsActions.getOrganizations({ payload: this.user._id })
        );
      });

    //Seleccionamos el usuario logueadoç
    this.store
      .select(state => state.auth.user)
      .pipe(
        takeUntil(this.unsuscribe$),
        filter(user => user !== null)
      )
      .subscribe(user => {
        this.user = user;
        this.store.dispatch(
          OrganizationsActions.getOrganizations({ payload: this.user._id })
        );
        this.store.dispatch(TicketsActions.getTickets({ payload: this.user }));
      });

    //Observamos los cambios en los loaders de las organizaciones
    this.organizationsLoading$ = this.store.select(
      state => state.userOrganizations.organizations.loading
    );

    this.organizationsLoaded$ = this.store.select(
      state => state.userOrganizations.organizations.loaded
    );

    //Seleccionamos las organizaciones cuando hay cambios en el store
    this.organizations$ = this.store.select(
      state => state.userOrganizations.organizations.organizations
    );

    //Observamos los cambios en los loaders de los tickets
    this.ticketsLoading$ = this.store.select(
      state => state.userOrganizations.tickets.userTickets.loading
    );

    this.ticketsLoaded$ = this.store.select(
      state => state.userOrganizations.tickets.userTickets.loaded
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
