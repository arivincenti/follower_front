import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const membersState = (state: AppState) =>
  state.userOrganizations.organization.members;

export const membersLoading = createSelector(
  membersState,
  (membersState) => membersState.loading
);

export const members = createSelector(
  membersState,
  (membersState) => membersState.members
);
