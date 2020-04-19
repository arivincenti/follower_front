import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { OrganizationModel } from "src/app/models/organization.model";

const organizationState = (state: AppState) =>
  state.userOrganizations.organization.organization;

export const organization = createSelector(
  organizationState,
  (organizationState) => organizationState.organization
);

export const organizationLoading = createSelector(
  organizationState,
  (organizationState) => organizationState.loading
);

export const organizationError = createSelector(
  organizationState,
  (organizationState) => organizationState.error
);
