import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  createNotification(payload: any) {
    return this.http
      .post(`${environment.path}/notifications`, payload)
      .pipe(map((notification: any) => notification.data));
  }

  getAllNotifications(user: UserModel) {
    return this.http
      .get(`${environment.path}/notifications/all/${user._id}`)
      .pipe(map((notifications: any) => notifications.data));
  }

  getUnreadNotifications(user: UserModel) {
    return this.http
      .get(`${environment.path}/notifications/unread/${user._id}`)
      .pipe(map((notifications: any) => notifications.data));
  }
}
