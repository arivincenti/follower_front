import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const commentsState = (state: AppState) =>
  state.userOrganizations.tickets.comments;

export const commentsLoading = createSelector(
  commentsState,
  (commentsState) => commentsState.loading
);

export const comments = createSelector(
  commentsState,
  (commentsState) => commentsState.comments
);
