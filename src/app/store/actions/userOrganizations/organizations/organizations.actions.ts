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

export const updateOrganizationList = createAction(
  "[Organizations Actions] Update Organization List",
  props<{ organization: OrganizationModel }>()
);

export const clearState = createAction("[Organizations Actions] Clear State");
