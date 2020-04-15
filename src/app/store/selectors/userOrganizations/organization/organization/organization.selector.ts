import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { OrganizationModel } from "src/app/models/organization.model";

const organizationsState = (state: AppState) =>
  state.userOrganizations.organizations;

export const organization = createSelector(
  organizationsState,
  (organizationsState, organization_id: string) =>
    organizationsState.organizations.find(
      (organization: OrganizationModel) => organization._id === organization_id
    )
);
