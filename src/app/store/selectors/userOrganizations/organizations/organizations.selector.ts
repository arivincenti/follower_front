import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const organizationState = (state: AppState) =>
  state.userOrganizations.organizations;

export const organizations = createSelector(
  organizationState,
  (organizationState) => organizationState.organizations
);

export const organizationsLoading = createSelector(
  organizationState,
  (organizationState) => organizationState.loading
);
