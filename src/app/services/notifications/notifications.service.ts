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

  getNotifications(user: UserModel) {
    return this.http
      .get(`${environment.path}/notifications/${user._id}`)
      .pipe(map((notifications: any) => notifications.data));
  }
}
