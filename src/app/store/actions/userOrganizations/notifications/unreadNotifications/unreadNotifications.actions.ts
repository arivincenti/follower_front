import { createAction, props } from "@ngrx/store";
import { NotificationModel } from "src/app/models/notificationModel";
import { UserModel } from "src/app/models/user.model";

export const getUnreadNotifications = createAction(
  "[Notifications Actions] Get unread notifications",
  props<{ payload: UserModel }>()
);

export const getUnreadNotificationsSuccess = createAction(
  "[Notifications Actions] Get unread notifications Success",
  props<{ payload: NotificationModel[] }>()
);

export const getUnreadNotificationsFail = createAction(
  "[Notifications Actions] Get unread notifications Fail",
  props<{ payload: any }>()
);
