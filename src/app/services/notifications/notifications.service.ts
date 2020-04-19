import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { WebsocketService } from "../websocket/websocket.service";
import { GenericNotificationComponent } from "src/app/shared/snackbar/generic-notification/generic-notification.component";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(
    private http: HttpClient,
    private _wsService: WebsocketService,
    private _snackBar: MatSnackBar
  ) {}

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
    operationType: string,
    created_by: string,
    users: string[]
  ) {
    var payload = {
      changes,
      object,
      objectType,
      operationType,
      created_by,
      users,
    };

    //Emitimos el evento para crear la nueva notificación
    this._wsService.emit("create-notification", payload);
  }

  // ==================================================
  // Generic notification
  // ==================================================
  genericNotification(notification: any) {
    this._snackBar.openFromComponent(GenericNotificationComponent, {
      duration: 5000,
      data: {
        type: notification.type,
        title: notification.title,
        message: notification.message,
      },
    });
  }
}
