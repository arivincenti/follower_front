import { createReducer, on, Action } from "@ngrx/store";
import * as UnreadNotificationsActions from "../../../../actions/userOrganizations/notifications/unreadNotifications/unreadNotifications.actions";
import { NotificationModel } from "src/app/models/notificationModel";

export interface UnreadNotificationsState {
  unreadNotifications: NotificationModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialUnreadNotificationsState: UnreadNotificationsState = {
  unreadNotifications: [],
  loading: false,
  loaded: false,
  error: null
};

export const unreadNotificationsReducer = createReducer(
  initialUnreadNotificationsState,
  on(UnreadNotificationsActions.getUnreadNotifications, state => ({
    ...state,
    unreadNotifications: state.unreadNotifications,
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    UnreadNotificationsActions.getUnreadNotificationsSuccess,
    (state, { payload }) => ({
      ...state,
      unreadNotifications: [...payload],
      loading: false,
      loaded: true
    })
  ),
  on(
    UnreadNotificationsActions.getUnreadNotificationsFail,
    (state, { payload }) => ({
      ...state,
      unreadNotifications: [],
      loading: false,
      loaded: false,
      error: { payload }
    })
  )
);

export function UnreadNotificationsReducer(
  state: UnreadNotificationsState | undefined,
  action: Action
) {
  return unreadNotificationsReducer(state, action);
}
