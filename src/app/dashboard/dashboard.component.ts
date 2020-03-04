import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { AreasService } from "../services/areas/areas.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NotificationsService } from "../services/notifications/notifications.service";
import * as UnreadNotificationsActions from "../store/actions/userOrganizations/notifications/unreadNotifications/unreadNotifications.actions";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();
  private auth;
  constructor(
    private _wsService: WebsocketService,
    private _areasService: AreasService,
    private _notificationsService: NotificationsService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._wsService.cargarStorage();

    //Obtenemos el usuario desde el localstorage
    this.auth = JSON.parse(localStorage.getItem("auth"));

    this.store.dispatch(
      UnreadNotificationsActions.getUnreadNotifications({
        payload: this.auth.user
      })
    );

    //Nos unimos a todas las salas de áreas
    this._areasService.getAreasByUser(this.auth.user).subscribe(areas => {
      this._wsService.emit("join-all-areas", areas);
    });

    //Escuchamos las actualizaciones en los tickets
    this._wsService
      .listen("update-ticket")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((movement: any) => {
        var users = [];
        var changes = [];

        for (let member of movement.ticket.area.members) {
          users.push(member.user);
        }

        if (movement.old.priority !== movement.new.priority) {
          var message = `Cambió la prioridad de "${movement.new.priority}" a "${movement.old.priority}"`;

          changes.push(message);
        }

        var payload = {
          changes: changes,
          object: movement.ticket._id,
          objectType: "ticket",
          objectName: movement.ticket.subject,
          updated_by: movement.new.created_by._id,
          users: users,
          area: movement.ticket.area._id
        };

        //Emitimos el evento para crear la nueva notificación
        this._wsService.emit("create-notification", payload);
      });

    //Escuchamos el mensaje de que una nueva notificacion se creó
    this._wsService
      .listen("new-notification")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((notification: any) => {
        var changes = notification.changes;

        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 8000,
          data: {
            notification
          }
        });

        this.store.dispatch(
          UnreadNotificationsActions.getUnreadNotifications({
            payload: this.auth.user
          })
        );
      });
  }

  letraCapital(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
