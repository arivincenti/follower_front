import { createAction, props } from "@ngrx/store";
import { NotificationModel } from "src/app/models/notificationModel";
import { UserModel } from "src/app/models/user.model";

export const getNotifications = createAction(
  "[Notifications Actions] Get notifications",
  props<{ payload: UserModel }>()
);

export const getNotificationsSuccess = createAction(
  "[Notifications Actions] Get notifications Success",
  props<{ payload: NotificationModel[] }>()
);

export const getNotificationsFail = createAction(
  "[Notifications Actions] Get notifications Fail",
  props<{ payload: any }>()
);

export const addNotification = createAction(
  "[Notifications Actions] Add notifications",
  props<{ payload: any }>()
);

export const addNotificationSuccess = createAction(
  "[Notifications Actions] Add notifications Success",
  props<{ payload: any }>()
);

export const addNotificationFail = createAction(
  "[Notifications Actions] Add notifications Fail",
  props<{ payload: any }>()
);
