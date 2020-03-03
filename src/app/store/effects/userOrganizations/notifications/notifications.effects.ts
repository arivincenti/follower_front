import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import * as UnreadNotificationsActions from "../../../actions/userOrganizations/notifications/unreadNotifications/unreadNotifications.actions";
import { NotificationsService } from "src/app/services/notifications/notifications.service";
import { NotificationModel } from "src/app/models/notificationModel";

@Injectable()
export class NotificationsEffects {
  constructor(
    private actions$: Actions,
    private _notificationsService: NotificationsService
  ) {}

  getUnreadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnreadNotificationsActions.getUnreadNotifications),
      mergeMap(action =>
        this._notificationsService.getUnreadNotifications(action.payload).pipe(
          map((notifications: NotificationModel[]) =>
            UnreadNotificationsActions.getUnreadNotificationsSuccess({
              payload: notifications
            })
          ),
          catchError(error =>
            of(
              UnreadNotificationsActions.getUnreadNotificationsFail(error.error)
            )
          )
        )
      )
    )
  );
}
