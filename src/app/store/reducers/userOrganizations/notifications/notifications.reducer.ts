import { createReducer, on, Action } from "@ngrx/store";
import * as NotificationsActions from "@actions/notifications";
import { NotificationModel } from "src/app/models/notificationModel";

export interface NotificationsState {
  notifications: NotificationModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialNotificationsState: NotificationsState = {
  notifications: [],
  loading: false,
  loaded: false,
  error: null,
};

export const notificationsReducer = createReducer(
  initialNotificationsState,
  on(NotificationsActions.getNotifications, (state) => ({
    ...state,
    notifications: [...state.notifications],
    loading: true,
    loaded: false,
    error: null,
  })),
  on(NotificationsActions.getNotificationsSuccess, (state, { payload }) => ({
    ...state,
    notifications: [...payload],
    loading: false,
    loaded: true,
  })),
  on(NotificationsActions.getNotificationsFail, (state, { payload }) => ({
    ...state,
    notifications: [],
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(NotificationsActions.addNotification, (state) => ({
    ...state,
    notifications: [...state.notifications],
    loading: true,
    loaded: true,
  })),
  on(NotificationsActions.addNotificationSuccess, (state, { payload }) => ({
    ...state,
    notifications: [{ ...payload }, ...state.notifications],
    loading: false,
    loaded: true,
  })),
  on(NotificationsActions.addNotificationFail, (state, { payload }) => ({
    ...state,
    notifications: [...state.notifications],
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function NotificationsReducer(
  state: NotificationsState | undefined,
  action: Action
) {
  return notificationsReducer(state, action);
}
