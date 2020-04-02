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

export const createOrganization = createAction(
  "[Organization Actions] Create Organization",
  props<{ payload: any }>()
);

export const createOrganizationSuccess = createAction(
  "[Organization Actions] Create Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const createOrganizationFail = createAction(
  "[Organization Actions] Create Organization Fail",
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

export const activateOrganization = createAction(
  "[Organization Actions] Activate Organization",
  props<{ payload: any }>()
);

export const activateOrganizationSuccess = createAction(
  "[Organization Actions] Activate Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const activateOrganizationFail = createAction(
  "[Organization Actions] Activate Organization Fail",
  props<{ payload: any }>()
);

export const desactivateOrganization = createAction(
  "[Organization Actions] Desactivate Organization",
  props<{ payload: any }>()
);

export const desactivateOrganizationSuccess = createAction(
  "[Organization Actions] Desactivate Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const desactivateOrganizationFail = createAction(
  "[Organization Actions] Desactivate Organization Fail",
  props<{ payload: any }>()
);

export const clearSelectedOrganizationState = createAction(
  "[Organization Actions] Clear Selected Organization State"
);
