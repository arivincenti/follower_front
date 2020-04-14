import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const selectedOrganizationState = (state: AppState) =>
  state.userOrganizations.selectedOrganization.members;

export const organizationMembersLoading = createSelector(
  selectedOrganizationState,
  (selectedOrganizationState) => selectedOrganizationState.loading
);

export const organizationMembers = createSelector(
  selectedOrganizationState,
  (selectedOrganizationState) => selectedOrganizationState.members
);
