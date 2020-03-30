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
  addNotification
} from "../store/actions/userOrganizations/notifications/notifications.actions";
import { logout } from "../store/actions/auth/auth.actions";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NotificationsService } from "../services/notifications/notifications.service";
import { UpdatedNotificationComponent } from "../shared/snackbar/updated-notification/updated-notification.component";
import { updateTicketList } from "../store/actions/userOrganizations/tickets/userTickets/userTickets.actions";
import { MemberModel } from "../models/member.model";
import { updateOrganizationList } from "../store/actions/userOrganizations/organizations/organizations.actions";
import { OrganizationsService } from "../services/organizations/organizations.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();
  private auth: any;

  user$: Observable<UserModel>;
  unreadNotifications$: Observable<NotificationModel[]>;
  theme$: Observable<string>;
  areas: AreaModel[];

  //Observable de Angular Material para el responsive design
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private store: Store<AppState>,
    public _wsService: WebsocketService,
    private _notificationService: NotificationsService,
    private _areasService: AreasService,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private _organizationService: OrganizationsService
  ) {}

  ngOnInit() {
    this.theme$ = this.store.select(state => state.ui.theme);

    this.listenUpdateSocket();

    //Obtenemos el usuario desde el localstorage
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.user$ = this.store.select(state => state.auth.user);

    //Restablecemos la configuracion del cliente en socket para no perder la instancia
    this._wsService.cargarStorage();

    //Obtenemos todas las notificaciones del usuario
    this.store.dispatch(
      getNotifications({
        payload: this.auth.user
      })
    );

    //Cargamos las notificaciones no leidas
    this.unreadNotifications$ = this.store
      .select(state => state.userOrganizations.notifications.notifications)
      .pipe(
        map((notifications: NotificationModel[]) => {
          var unreadNotifications = [];
          notifications.forEach(notification => {
            if (
              !notification.readed_by.find(user => user === this.auth.user._id)
            ) {
              unreadNotifications.push(notification);
            }
          });
          return unreadNotifications;
        })
      );

    // Nos unimos a todas las salas de organizaciones
    this.joinAllOrganizations();

    // Nos unimos a todas las salas de áreas
    this.joinAllAreas();

    //Nos unimos a todos nuestros tickets......
    this.joinAllTickets();

    //Escuchamos el mensaje de que una nueva notificacion se creó
    this.listenNewNotifications();
  }

  // ==================================================
  // Log Out
  // ==================================================
  logout() {
    this.store
      .select(state => state.userOrganizations.tickets.userTickets.tickets)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(tickets => {
        this._wsService.emit("leave-all-tickets", tickets);
      });
    this._wsService.emit("leave-all-areas", this.areas);
    this.store.dispatch(logout());
  }

  // ==================================================
  // Join All Areas
  // ==================================================
  joinAllOrganizations() {
    this.store
      .select(state => state.userOrganizations.organizations.organizations)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(organizations => {
        this._wsService.emit("join-all-organizations", organizations);
      });
  }

  // ==================================================
  // Join All Areas
  // ==================================================
  joinAllAreas() {
    this._areasService
      .getAreasByUser(this.auth.user)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(areas => {
        this.areas = areas;
        this._wsService.emit("join-all-areas", areas);
      });
  }

  // ==================================================
  // Join All Tickets
  // ==================================================
  joinAllTickets() {
    this.store
      .select(state => state.userOrganizations.tickets.userTickets.tickets)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(tickets => {
        this._wsService.emit("join-all-tickets", tickets);
      });
  }

  // ==================================================
  // Listen Updates in ticket
  // ==================================================
  listenUpdateSocket() {
    this._wsService
      .listen("update")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((payload: any) => {
        this.createNotification(payload);
      });
  }

  createNotification(payload: any) {
    var users = [];
    var changes = [];

    switch (payload.objectType) {
      case "ticket":
        //Cargamos los cambios del ticket para que se guarden en la notificacion
        if (payload.old.priority !== payload.new.priority) {
          var message = `Cambió la prioridad de "${payload.old.priority}" a "${payload.new.priority}"`;
          changes.push(message);
        }
        break;
    }

    //Agregamos a todos los miembros del area correspondiente a la notificacion
    users = payload.members.map(member => member.user);
    users = users.filter(user => user._id !== payload.object.updated_by._id);

    //Agregamos al creador del ticket a la notificacion siempre y cuando no exista ya entre los miembros del area
    var userCoincidence = payload.members.find(
      (member: MemberModel) => member.user._id === payload.object.created_by._id
    );
    //Si el usuario creador del ticket no es miembro del area se agrega para ser notificado
    if (!userCoincidence) {
      users.push(payload.object.created_by);
    }

    //Emitimos la notificacion
    this._notificationService.createNewNotification(
      changes,
      payload.object,
      payload.objectType,
      payload.object.updated_by._id,
      users
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

        if (notification.updated_by._id !== this.auth.user._id) {
          this._snackBar.openFromComponent(UpdatedNotificationComponent, {
            duration: 5000,
            data: {
              notification,
              object
            }
          });

          this.store.dispatch(
            addNotification({
              payload: notification
            })
          );
        }

        switch (notification.objectType) {
          case "ticket":
            this.store.dispatch(updateTicketList({ payload: object }));
            break;
          case "organization":
            this.store.dispatch(
              updateOrganizationList({ organization: object })
            );
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
