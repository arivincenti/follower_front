import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { UserModel } from "src/app/models/user.model";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  public socketStatus: boolean = false;
  public user: UserModel = null;

  constructor(private socket: Socket, private store: Store<AppState>) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on("connect", () => {
      console.log("Conectado al servidor");
      this.cargarStorage();
      this.socketStatus = true;
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  cargarStorage() {
    if (localStorage.getItem("auth")) {
      let auth = JSON.parse(localStorage.getItem("auth"));
      this.user = auth.user;
    }
    this.emit("config-client", this.user, (res) => {
      console.log(res);
    });
  }

  logoutWs() {
    this.user = null;
    this.emit("config-client", this.user);
  }
}
