import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import * as NotificationsActions from "@actions/notifications";
import { NotificationsService } from "src/app/services/notifications/notifications.service";
import { NotificationModel } from "src/app/models/notificationModel";

@Injectable()
export class NotificationsEffects {
  constructor(
    private actions$: Actions,
    private _notificationsService: NotificationsService
  ) {}

  getNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.getNotifications),
      mergeMap((action) =>
        this._notificationsService.getNotifications(action.payload).pipe(
          map((notifications: NotificationModel[]) =>
            NotificationsActions.getNotificationsSuccess({
              payload: notifications,
            })
          ),
          catchError((error) =>
            of(NotificationsActions.getNotificationsFail(error.error))
          )
        )
      )
    )
  );

  addNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.addNotification),
      map((action) =>
        NotificationsActions.addNotificationSuccess({
          payload: action.payload,
        })
      )
    )
  );
}
