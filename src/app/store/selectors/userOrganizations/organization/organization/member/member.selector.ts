import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const memberState = (state: AppState) =>
  state.userOrganizations.organization.member;

export const memberLoading = createSelector(
  memberState,
  (memberState) => memberState.loading
);

export const member = createSelector(
  memberState,
  (memberState) => memberState.member
);
