import { createAction, props } from "@ngrx/store";
import { OrganizationModel } from "src/app/models/organization.model";

export const getOrganization = createAction(
  "[Organization Actions] Get Organization",
  props<{ organization: string }>()
);

export const getOrganizationSuccess = createAction(
  "[Organization Actions] Get Organization Success",
  props<{ payload: OrganizationModel }>()
);

export const getOrganizationFail = createAction(
  "[Organization Actions] Get Organization Fail",
  props<{ payload: any }>()
);

export const updateOrganization = createAction(
  "[Organization Actions] Update Organization",
  props<{ organizationId: string; payload: any }>()
);

export const updateOrganizationSuccess = createAction(
  "[Organization Actions] Update Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const updateOrganizationFail = createAction(
  "[Organization Actions] Update Organization Fail",
  props<{ payload: any }>()
);

export const deleteOrganization = createAction(
  "[Organization Actions] Delete Organization",
  props<{ payload: any }>()
);

export const deleteOrganizationSuccess = createAction(
  "[Organization Actions] Delete Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const deleteOrganizationFail = createAction(
  "[Organization Actions] Delete Organization Fail",
  props<{ payload: any }>()
);

export const clearSelectedOrganizationState = createAction(
  "[Organization Actions] Clear Selected Organization State"
);
