import { createAction, props } from "@ngrx/store";
import { OrganizationModel } from "../../../../models/organization.model";

export const getOrganizations = createAction(
  "[Organizations Actions] Get Organizations",
  props<{ payload: string }>()
);

export const getOrganizationsSuccess = createAction(
  "[Organizations Actions] Get Organizations Success",
  props<{ payload: OrganizationModel[] }>()
);

export const getOrganizationsFail = createAction(
  "[Organizations Actions] Get Organizations Fail",
  props<{ payload: any }>()
);

export const createOrganization = createAction(
  "[Organizations Actions] Create Organization",
  props<{ payload: any }>()
);

export const createOrganizationSuccess = createAction(
  "[Organizations Actions] Create Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const createOrganizationFail = createAction(
  "[Organizations Actions] Create Organization Fail",
  props<{ payload: any }>()
);

export const updateOrganization = createAction(
  "[Organizations Actions] Update Organization",
  props<{ organizationId: string; payload: any }>()
);

export const updateOrganizationSuccess = createAction(
  "[Organizations Actions] Update Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const updateOrganizationFail = createAction(
  "[Organizations Actions] Update Organization Fail",
  props<{ payload: any }>()
);

export const activateOrganization = createAction(
  "[Organizations Actions] Activate Organization",
  props<{ payload: any }>()
);

export const activateOrganizationSuccess = createAction(
  "[Organizations Actions] Activate Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const activateOrganizationFail = createAction(
  "[Organizations Actions] Activate Organization Fail",
  props<{ payload: any }>()
);

export const desactivateOrganization = createAction(
  "[Organizations Actions] Desactivate Organization",
  props<{ payload: any }>()
);

export const desactivateOrganizationSuccess = createAction(
  "[Organizations Actions] Desactivate Organization Success",
  props<{ organization: OrganizationModel }>()
);

export const desactivateOrganizationFail = createAction(
  "[Organizations Actions] Desactivate Organization Fail",
  props<{ payload: any }>()
);

// export const addCreatedOrganizationToList = createAction(
//   "[Organizations Actions] Add Created Organization To List",
//   props<{ organization: OrganizationModel }>()
// );

// export const updateOrganizationList = createAction(
//   "[Organizations Actions] Update Organization List",
//   props<{ organization: OrganizationModel }>()
// );

export const clearState = createAction("[Organizations Actions] Clear State");
