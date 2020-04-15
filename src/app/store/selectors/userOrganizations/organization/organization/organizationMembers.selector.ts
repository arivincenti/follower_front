import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const organizationState = (state: AppState) =>
  state.userOrganizations.organization.members;

export const organizationMembersLoading = createSelector(
  organizationState,
  (organizationState) => organizationState.loading
);

export const organizationMembers = createSelector(
  organizationState,
  (organizationState) => organizationState.members
);
