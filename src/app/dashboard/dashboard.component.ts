import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { WebsocketService } from "../services/websocket/websocket.service";
import { MatSnackBar } from "@angular/material";
import { map, shareReplay } from "rxjs/operators";
import { UserModel } from "../models/user.model";
import { NotificationModel } from "../models/notificationModel";
import { AreaModel } from "../models/area.model";
import {
  getNotifications,
  addNotification,
} from "../store/actions/userOrganizations/notifications/notifications.actions";
import { logout } from "../store/actions/auth/auth.actions";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NotificationsService } from "../services/notifications/notifications.service";
import { UpdatedNotificationComponent } from "../shared/snackbar/updated-notification/updated-notification.component";
import * as AreaActions from "../store/actions/userOrganizations/organization/area/area.actions";
import { UsersService } from "../services/users/users.service";
import { TicketModel } from "../models/ticketModel";
import { OrganizationModel } from "../models/organization.model";
import { getTickets } from "../store/actions/userOrganizations/tickets/tickets/tickets.actions";
import { getOrganizations } from "../store/actions/userOrganizations/organizations/organizations.actions";
import { notifications } from "../store/selectors/notifications/notification.selector";
import { organizations } from "../store/selectors/userOrganizations/organizations/organizations.selector";
import { userTickets } from "../store/selectors/userOrganizations/tickets/tickets/tickets.selector";
import { user } from "../store/selectors/auth/auth.selector";
import { SubSink } from "subsink";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs = new SubSink();

  auth: any;
  user$: Observable<UserModel>;
  user: UserModel;
  unreadNotifications$: Observable<NotificationModel[]>;

  tickets$: Observable<TicketModel[]>;
  tickets: TicketModel[];
  areas$: Observable<AreaModel[]>;
  areas: AreaModel[];
  organizations$: Observable<OrganizationModel[]>;
  organizations: OrganizationModel[];

  //Observable de Angular Material para el responsive design
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private store: Store<AppState>,
    public _wsService: WebsocketService,
    private _usersService: UsersService,
    private _notificationService: NotificationsService,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.user = this.auth.user;
    this.user$ = this.store.select(user);

    this.store.dispatch(getOrganizations({ payload: this.user._id }));
    this.store.dispatch(getTickets({ payload: this.user }));

    //Restablecemos la configuracion del cliente en socket para no perder la instancia
    this._wsService.cargarStorage();

    //Obtenemos todas las notificaciones del usuario
    this.store.dispatch(getNotifications({ payload: this.user }));

    this.organizations$ = this.store.select(organizations);
    this.tickets$ = this.store.select(userTickets);
    this.unreadNotifications$ = this.store.select(notifications);

    // this.listenMemberCreated();
    // this.listenMemberDeleted();
    this.listenNewNotifications();
  }

  ngOnInit() {}

  // ==================================================
  // Log Out
  // ==================================================
  logout() {
    this.store.dispatch(logout());
  }

  // ==================================================
  // Listen New Notifications
  // ==================================================
  listenNewNotifications() {
    this.subs.add(
      this._wsService
        .listen("new-notification")
        .subscribe((socketPayload: any) => {
          var object = socketPayload.object;
          var notification = socketPayload.notification;

          this._snackBar.openFromComponent(UpdatedNotificationComponent, {
            duration: 5000,
            data: {
              user: this.user,
              notification,
              object,
            },
          });

          this.store.dispatch(
            addNotification({
              payload: notification,
            })
          );

          if (notification.created_by._id !== this.user._id) {
            this._usersService.updateObjectsState(
              notification.objectType,
              notification.operationType,
              object
            );
          }
        })
    );
  }

  // ==================================================
  // Socket Member Deleted
  // ==================================================
  listenMemberDeleted() {
    this.subs.add(
      this._wsService.listen("member-deleted").subscribe((payload: any) => {
        switch (payload.objectType) {
          case "area":
            this.store.dispatch(getTickets({ payload: this.user }));
            this.store.dispatch(
              AreaActions.updateAreaSuccess({ area: payload.object })
            );
            break;
        }
      })
    );
  }

  // ==================================================
  // Socket Member created
  // ==================================================
  listenMemberCreated() {
    this.subs.add(
      this._wsService.listen("member-created").subscribe((payload: any) => {
        switch (payload.objectType) {
          case "area":
            this.store.dispatch(getTickets({ payload: this.user }));
            this.store.dispatch(
              AreaActions.updateAreaSuccess({ area: payload.object })
            );
            break;
          case "member":
            this.store.dispatch(getOrganizations({ payload: this.user._id }));
            break;
        }
      })
    );
  }

  // ==================================================
  // Ng OnDestroy
  // ==================================================
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
