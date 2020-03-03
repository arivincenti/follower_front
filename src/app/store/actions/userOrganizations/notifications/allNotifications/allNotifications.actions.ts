import { createAction, props } from "@ngrx/store";
import { NotificationModel } from "../../../../../models/notificationModel";
import { UserModel } from "src/app/models/user.model";

export const getAllNotifications = createAction(
  "[Notifications Actions] Get all notifications",
  props<{ payload: UserModel }>()
);

export const getAllNotificationsSuccess = createAction(
  "[Notifications Actions] Get all notifications Success",
  props<{ payload: NotificationModel[] }>()
);

export const getAllNotificationsFail = createAction(
  "[Notifications Actions] Get all notifications Fail",
  props<{ payload: any }>()
);
