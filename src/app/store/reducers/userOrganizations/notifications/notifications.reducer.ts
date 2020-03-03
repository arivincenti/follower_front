import { combineReducers } from "@ngrx/store";
import * as AllNotificationsReducer from "./allNotifications/allNotifications.reducer";
import * as UnreadNotificationsReducer from "./unreadNotifications/unreadNotifications.reducer";

export interface state {
  allNotifications: AllNotificationsReducer.AllNotificationsState;
  unreadNotifications: UnreadNotificationsReducer.UnreadNotificationsState;
}

export const initialState: state = {
  allNotifications: AllNotificationsReducer.initialAllNotificationsState,
  unreadNotifications:
    UnreadNotificationsReducer.initialUnreadNotificationsState
};

export const NotificationsReducer = combineReducers(
  {
    allNotifications: AllNotificationsReducer.AllNotificationsReducer,
    unreadNotifications: UnreadNotificationsReducer.UnreadNotificationsReducer
  },
  initialState
);
