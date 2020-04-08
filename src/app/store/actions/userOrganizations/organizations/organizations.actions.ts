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

export const addCreatedOrganizationToList = createAction(
  "[Organizations Actions] Add Created Organization To List",
  props<{ organization: OrganizationModel }>()
);

export const updateOrganizationList = createAction(
  "[Organizations Actions] Update Organization List",
  props<{ organization: OrganizationModel }>()
);

export const clearState = createAction("[Organizations Actions] Clear State");
