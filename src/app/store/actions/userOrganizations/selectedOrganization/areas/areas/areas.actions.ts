import { createAction, props } from "@ngrx/store";
import { AreaModel } from "../../../../../../models/area.model";
import { OrganizationModel } from "src/app/models/organization.model";

export const getAreas = createAction(
  "[Areas Actions] Get Areas",
  props<{ payload: OrganizationModel; since: number; size: number }>()
);

export const getAreasSuccess = createAction(
  "[Areas Actions] Get Areas Success",
  props<{ payload: AreaModel[] }>()
);

export const getAreasFail = createAction(
  "[Areas Actions] Get Areas Fail",
  props<{ payload: any }>()
);

export const createArea = createAction(
  "[Areas Actions] Create Area",
  props<{ payload: any }>()
);

export const createAreaSuccess = createAction(
  "[Areas Actions] Create Area Success",
  props<{ payload: AreaModel }>()
);

export const createAreaFail = createAction(
  "[Areas Actions] Create Area Fail",
  props<{ payload: any }>()
);

export const updateAreasList = createAction(
  "[Areas Actions] Update Areas List",
  props<{ area: AreaModel }>()
);

export const clearAreasState = createAction(
  "[Areas Actions] Clear Areas State"
);
