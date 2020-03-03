import { createReducer, on, Action } from "@ngrx/store";
import * as AllNotificationsActions from "../../../../actions/userOrganizations/notifications/allNotifications/allNotifications.actions";
import { NotificationModel } from "src/app/models/notificationModel";

export interface AllNotificationsState {
  allNotifications: NotificationModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialAllNotificationsState: AllNotificationsState = {
  allNotifications: [],
  loading: false,
  loaded: false,
  error: null
};

export const allNotificationsReducer = createReducer(
  initialAllNotificationsState,
  on(AllNotificationsActions.getAllNotifications, state => ({
    ...state,
    allNotifications: [],
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    AllNotificationsActions.getAllNotificationsSuccess,
    (state, { payload }) => ({
      ...state,
      allNotifications: [...payload],
      loading: false,
      loaded: true
    })
  ),
  on(AllNotificationsActions.getAllNotificationsFail, (state, { payload }) => ({
    ...state,
    allNotifications: [],
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function AllNotificationsReducer(
  state: AllNotificationsState | undefined,
  action: Action
) {
  return allNotificationsReducer(state, action);
}
