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
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";
import { getTickets } from "../store/actions/userOrganizations/tickets/userTickets/userTickets.actions";

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
    private _areasService: AreasService,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    //Restablecemos la configuracion del cliente en socket para no perder la instancia
    this._wsService.cargarStorage();

    //Obtenemos el usuario desde el localstorage
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.user$ = this.store.select(state => state.auth.user);

    //Obtenemos todas las notificaciones
    this.store.dispatch(
      getNotifications({
        payload: this.auth.user
      })
    );

    // Nos unimos a todas las salas de áreas
    this._areasService
      .getAreasByUser(this.auth.user)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(areas => {
        this.areas = areas;
        console.log("nos subscribimos a todas las areas");
        this._wsService.emit("join-all-areas", areas);
      });

    //Nos unimos a todos nuestros tickets......
    this.store
      .select(state => state.userOrganizations.tickets.userTickets.tickets)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(tickets => {
        this._wsService.emit("join-all-tickets", tickets);
      });

    this.listenUpdateTicketSocket();

    //Escuchamos el mensaje de que una nueva notificacion se creó
    this._wsService
      .listen("new-notification")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((notification: any) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: {
            notification
          }
        });

        if (notification.updated_by._id !== this.auth.user._id) {
          if (notification.objectType === "ticket") {
            this.store.dispatch(getTickets({ payload: this.auth.user }));
          }
        }

        this.store.dispatch(
          addNotification({
            payload: notification
          })
        );
      });

    this.theme$ = this.store.select(state => state.ui.theme);

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
  }

  log(state: any) {
    console.log(state);
  }

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

  listenUpdateTicketSocket() {
    this._wsService
      .listen("update-ticket")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((movement: any) => {
        var users = [];
        var changes = [];
        //Agregamos a todos los miembros del area correspondiente a la notificacion
        for (let member of movement.ticket.area.members) {
          users.push(member.user);
        }
        //Agregamos al creador del ticket a la notificacion siempre y cuando no exista ya entre los miembros del area
        if (!users.find(user => user._id === movement.ticket.created_by._id)) {
          users.push(movement.ticket.created_by);
        }

        if (movement.old.priority !== movement.new.priority) {
          var message = `Cambió la prioridad de "${movement.old.priority}" a "${movement.new.priority}"`;
          changes.push(message);
        }

        //Emitimos la notificacion
        this.emitNotificationSocket(
          changes,
          movement.ticket,
          "ticket",
          movement.new.created_by._id,
          users
        );
      });
  }

  // ==================================================
  // Emit notification socket
  // ==================================================
  emitNotificationSocket(
    changes: any[],
    object: string,
    objectType: string,
    updated_by: string,
    users: string[]
  ) {
    var payload = {
      changes: changes,
      object: object,
      objectType: objectType,
      updated_by: updated_by,
      users: users
    };
    //Emitimos el evento para crear la nueva notificación
    this._wsService.emit("create-notification", payload);
  }

  // ==================================================
  // Ng OnDestroy
  // ==================================================
  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
