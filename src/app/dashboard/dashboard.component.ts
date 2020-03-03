import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebsocketService } from "../services/websocket/websocket.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { AreasService } from "../services/areas/areas.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NotificationsService } from "../services/notifications/notifications.service";
import * as UnreadNotificationsActions from "../store/actions/userOrganizations/notifications/unreadNotifications/unreadNotifications.actions";

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
    private store: Store<AppState>
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

    //Escuchamos as actualizaciones en los tickets
    this._wsService
      .listen("update-ticket")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((ticket: any) => {
        console.log("enviamos peticion");
        var users = [];

        for (let member of ticket.area.members) {
          users.push(member.user);
        }

        var payload = {
          notification: "prueba",
          object: ticket._id,
          objectType: "ticket",
          users: users,
          area: ticket.area._id
        };

        this._notificationsService
          .createNotification(payload)
          .pipe(takeUntil(this.unsuscribe$))
          .subscribe(res => {});
      });

    this._wsService
      .listen("new-notification")
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((notification: any) => {
        this.store.dispatch(
          UnreadNotificationsActions.getUnreadNotifications({
            payload: this.auth.user
          })
        );
      });
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
