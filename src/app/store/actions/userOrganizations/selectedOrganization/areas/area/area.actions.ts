import { createAction, props } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";

export const getArea = createAction(
  "[Area Actions] Get Area",
  props<{ payload: string }>()
);

export const getAreaSuccess = createAction(
  "[Area Actions] Get Area Success",
  props<{ payload: AreaModel }>()
);

export const getAreaFail = createAction(
  "[Area Actions] Get Area Fail",
  props<{ payload: any }>()
);

export const updateArea = createAction(
  "[Area Actions] Update Area",
  props<{ areaId: string; payload: any }>()
);

export const updateAreaSuccess = createAction(
  "[Area Actions] Update Area Success",
  props<{ payload: AreaModel }>()
);

export const updateAreaFail = createAction(
  "[Area Actions] Update Area Fail",
  props<{ payload: any }>()
);

export const deleteArea = createAction(
  "[Area Actions] Delete Area",
  props<{ payload: any }>()
);

export const deleteAreaSuccess = createAction(
  "[Area Actions] Delete Area Success",
  props<{ payload: AreaModel }>()
);

export const deleteAreaFail = createAction(
  "[Area Actions] Delete Area Fail",
  props<{ payload: any }>()
);

export const createAreaMember = createAction(
  "[Area Actions] Create Area Member",
  props<{ payload: any }>()
);

export const createAreaMemberSuccess = createAction(
  "[Area Actions] Create Area Member Success",
  props<{ payload: AreaModel }>()
);

export const createAreaMemberFail = createAction(
  "[Area Actions] Create Area Member Fail",
  props<{ payload: any }>()
);

export const deleteAreaMember = createAction(
  "[Area Actions] Delete Area Member",
  props<{ payload: any }>()
);

export const deleteAreaMemberSuccess = createAction(
  "[Area Actions] Delete Area Member Success",
  props<{ payload: AreaModel }>()
);

export const deleteAreaMemberFail = createAction(
  "[Area Actions] Delete Area Member Fail",
  props<{ payload: any }>()
);

export const setResponsibleAreaMember = createAction(
  "[Area Actions] Set Responsible Area Member",
  props<{ payload: any }>()
);

export const setResponsibleAreaMemberSuccess = createAction(
  "[Area Actions] Set Responsible Area Member Success",
  props<{ payload: AreaModel }>()
);

export const setResponsibleAreaMemberFail = createAction(
  "[Area Actions] Set Responsible Area Member Fail",
  props<{ payload: any }>()
);

export const clear = createAction("[Area Actions] Clear");
