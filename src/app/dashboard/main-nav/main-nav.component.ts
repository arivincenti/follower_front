import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subject } from "rxjs";
import { map, shareReplay, takeUntil } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "../../store/actions/auth/auth.actions";
import * as UiActions from "../../store/actions/ui/ui.actions";
import { OverlayContainer } from "@angular/cdk/overlay";
import { WebsocketService } from "src/app/services/websocket/websocket.service";
import { NotificationModel } from "src/app/models/notificationModel";
import { MatSnackBar } from "@angular/material";
import {
  getNotifications,
  addNotification
} from "src/app/store/actions/userOrganizations/notifications/notifications.actions";
import { SnackbarComponent } from "src/app/shared/snackbar/snackbar.component";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnInit, OnDestroy {
  user$: Observable<UserModel>;
  unreadNotifications$: Observable<NotificationModel[]>;
  theme$: Observable<string>;
  oldTheme: string;
  newTheme: string;

  private unsuscribe$ = new Subject();
  private auth;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    public _wsService: WebsocketService,
    private _snackBar: MatSnackBar
  ) {
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

    //Nos unimos a todas las salas de áreas
    // this._areasService
    //   .getAreasByUser(this.auth.user)
    //   .pipe(takeUntil(this.unsuscribe$))
    //   .subscribe(areas => {
    //     console.log("nos subscribimos a todas las areas");
    //     this._wsService.emit("join-all-areas", areas);
    //   });

    //Nos unimos a todos nuestros tickets......
    this.store
      .select(state => state.userOrganizations.tickets.userTickets.tickets)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(tickets => {
        this._wsService.emit("join-all-tickets", tickets);
      });
  }

  // ==================================================
  // OnInit
  // ==================================================
  ngOnInit() {
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

    this.theme$ = this.store
      .select(state => state.ui.theme)
      .pipe(
        map(theme => {
          this.newTheme = theme;

          this.overlayContainer
            .getContainerElement()
            .classList.remove(this.oldTheme);
          this.overlayContainer
            .getContainerElement()
            .classList.add(this.newTheme);

          this.oldTheme = this.newTheme;

          return theme;
        })
      );

    //Escuchamos las actualizaciones en los tickets
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

        var payload = {
          changes: changes,
          object: movement.ticket,
          objectType: "ticket",
          updated_by: movement.new.created_by._id,
          users: users
        };

        //Emitimos el evento para crear la nueva notificación
        this._wsService.emit("create-notification", payload);
      });

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

        this.store.dispatch(
          addNotification({
            payload: notification
          })
        );
      });
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
    console.log("destruimos el menu");
  }

  logout() {
    this.store
      .select(state => state.userOrganizations.tickets.userTickets.tickets)
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(tickets => {
        this._wsService.emit("leave-all-tickets", tickets);
      });

    this.store.dispatch(AuthActions.logout());
  }

  changeTheme(color: string) {
    this.store.dispatch(UiActions.selectTheme({ payload: color }));
  }

  search() {
    console.log("buscando ticket");
  }
}
