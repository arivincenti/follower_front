import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  constructor(private http: HttpClient, private _wsService: WebsocketService) {}

  getNotifications(user: UserModel) {
    return this.http
      .get(`${environment.path}/notifications/${user._id}`)
      .pipe(map((notifications: any) => notifications.data));
  }

  // ==================================================
  // Emit notification socket
  // ==================================================
  createNewNotification(
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
}
