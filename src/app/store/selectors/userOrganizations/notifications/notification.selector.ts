import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const notificationsSelect = (state: AppState) =>
  state.userOrganizations.notifications;

export const notifications = createSelector(
  notificationsSelect,
  (notificationsSelect) => {
    var unreadNotifications = [];
    notificationsSelect.notifications.forEach((notification) => {
      if (!notification.readed_by.find((user) => user === this.auth.user._id)) {
        unreadNotifications.push(notification);
      }
    });
    return unreadNotifications;
  }
);

export const notificationsLoading = createSelector(
  notificationsSelect,
  (notificationsSelect) => notificationsSelect.loading
);
