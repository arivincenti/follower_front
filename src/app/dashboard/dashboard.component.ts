import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { WebsocketService } from "../services/websocket/websocket.service";
import { AreasService } from "../services/areas/areas.service";
import { MatSnackBar } from "@angular/material";
import { takeUntil, map, shareReplay } from "rxjs/operators";
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
import { MemberModel } from "../models/member.model";
import * as AreasActions from "../store/actions/userOrganizations/selectedOrganization/areas/areas.actions";
import { UsersService } from "../services/users/users.service";
import { TicketModel } from "../models/ticketModel";
import { OrganizationModel } from "../models/organization.model";
import { getTickets } from "../store/actions/userOrganizations/tickets/tickets/tickets.actions";
import { getOrganizations } from "../store/actions/userOrganizations/organizations/organizations.actions";
import { notifications } from "../store/selectors/notifications/notification.selector";
import { organizations } from "../store/selectors/userOrganizations/organizations/organizations.selector";
import { userTickets } from "../store/selectors/userOrganizations/tickets/tickets/tickets.selector";
import { user } from "../store/selectors/auth/auth.selector";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();

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
    private _areasService: AreasService,
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

    this.joinAllOrganizations();
    this.joinAllAreas();
    this.joinAllTickets();

    this.listenMemberCreated();
    this.listenMemberDeleted();
    this.listenCreateSocket();
    this.listenUpdateSocket();
    this.listenNewNotifications();
  }

  ngOnInit() {}

  // ==================================================
  // Log Out
  // ==================================================
  logout() {
    this._wsService.emit("leave-all-organizations", this.organizations);
    this._wsService.emit("leave-all-areas", this.areas);
    this._wsService.emit("leave-all-tickets", this.tickets);
    this.store.dispatch(logout());
  }

  // ==================================================
  // Join All Areas
  // ==================================================
  joinAllOrganizations() {
    this.organizations$
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((organizations) => {
        this.organizations = organizations;
        return this._wsService.emit("join-all-organizations", organizations);
      });
  }

  // ==================================================
  // Join All Areas
  // ==================================================
  joinAllAreas() {
    this._areasService
      .getAreasByUser(this.user)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((areas) => {
        this.areas = areas;
        this._wsService.emit("join-all-areas", areas);
      });
  }

  // ==================================================
  // Join All Tickets
  // ==================================================
  joinAllTickets() {
    this.tickets$.pipe(takeUntil(this.unsuscribe$)).subscribe((tickets) => {
      this.tickets = tickets;
      return this._wsService.emit("join-all-tickets", tickets);
    });
  }

  // ==================================================
  // Listen create objects
  // ==================================================
  listenCreateSocket() {
    this._wsService
      .listen("create")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((payload: any) => {
        this.createNotification(payload, "create");
      });
  }

  // ==================================================
  // Listen Updates objects
  // ==================================================
  listenUpdateSocket() {
    this._wsService
      .listen("update")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((payload: any) => {
        this.createNotification(payload, "update");
      });
  }

  // ==================================================
  // Create notification
  // ==================================================
  createNotification(payload: any, type: string) {
    var notification_created_by = null;
    var notification_users = payload.members.map((member) => member.user);

    switch (type) {
      case "create":
        notification_created_by = payload.object.created_by;
        notification_users = notification_users.filter(
          (user) => user._id !== payload.object.created_by._id
        );
        break;
      case "update":
        notification_created_by = payload.object.updated_by;
        notification_users = notification_users.filter(
          (user) => user._id !== payload.object.updated_by._id
        );
        break;
    }

    switch (payload.objectType) {
      case "ticket":
        //Agregamos al creador del ticket a la notificacion siempre y cuando no exista ya entre los miembros del area
        var userCoincidence = payload.members.find(
          (member: MemberModel) =>
            member.user._id === payload.object.created_by._id
        );
        //Si el usuario creador del ticket no es miembro del area se agrega para ser notificado
        if (!userCoincidence) {
          notification_users.push(payload.object.created_by);
        }
        break;
    }

    //Actualizamos los objectos del usuario que realizo la modificacion o creó alguno nuevo
    //Solo actualizamos los objectos que se modificaron.
    // this._usersService.updateObjectsState(
    //   payload.objectType,
    //   payload.operationType,
    //   payload.object
    // );

    //Emitimos la notificacion
    this._notificationService.createNewNotification(
      payload.changes,
      payload.object,
      payload.objectType,
      payload.operationType,
      notification_created_by,
      notification_users
    );
  }

  // ==================================================
  // Listen New Notifications
  // ==================================================
  listenNewNotifications() {
    this._wsService
      .listen("new-notification")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((socketPayload: any) => {
        var object = socketPayload.object;
        var notification = socketPayload.notification;

        this._snackBar.openFromComponent(UpdatedNotificationComponent, {
          duration: 5000,
          data: {
            notification,
            object,
          },
        });

        if (notification.created_by._id !== this.user._id) {
          this.store.dispatch(
            addNotification({
              payload: notification,
            })
          );

          // this._usersService.updateObjectsState(
          //   notification.objectType,
          //   notification.operationType,
          //   object
          // );
        }
      });
  }

  // ==================================================
  // Socket Member Deleted
  // ==================================================
  listenMemberDeleted() {
    this._wsService
      .listen("member-deleted")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((payload: any) => {
        switch (payload.objectType) {
          case "area":
            this.store.dispatch(getTickets({ payload: this.user }));
            this.store.dispatch(
              AreasActions.updateAreaSuccess({ payload: payload.object })
            );
            this._wsService.emit("leave-area", payload.object._id);
            break;
        }
      });
  }

  // ==================================================
  // Socket Member created
  // ==================================================
  listenMemberCreated() {
    this._wsService
      .listen("member-created")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((payload: any) => {
        switch (payload.objectType) {
          case "area":
            this.store.dispatch(getTickets({ payload: this.user }));
            this.store.dispatch(
              AreasActions.updateAreaSuccess({ payload: payload.object })
            );
            this._wsService.emit("join-area", payload.object._id);
            break;
          case "member":
            this.store.dispatch(getOrganizations({ payload: this.user._id }));
            this._wsService.emit("join-orgnanization", payload.object._id);
            break;
        }
      });
  }

  // ==================================================
  // Ng OnDestroy
  // ==================================================
  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
