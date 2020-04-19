import { createAction, props } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";

export const getArea = createAction(
  "[Area Actions] Get Area",
  props<{ payload: any }>()
);

export const getAreaSuccess = createAction(
  "[Area Actions] Get Area Success",
  props<{ area: AreaModel }>()
);

export const getAreaFail = createAction(
  "[Area Actions] Get Area Fail",
  props<{ payload: any }>()
);

export const createArea = createAction(
  "[Area Actions] Create Area",
  props<{ payload: any }>()
);

export const createAreaSuccess = createAction(
  "[Area Actions] Create Area Success",
  props<{ area: AreaModel }>()
);

export const createAreaFail = createAction(
  "[Area Actions] Create Area Fail",
  props<{ payload: any }>()
);

export const updateArea = createAction(
  "[Area Actions] Update Area",
  props<{ areaId: string; payload: any }>()
);

export const updateAreaSuccess = createAction(
  "[Area Actions] Update Area Success",
  props<{ area: AreaModel }>()
);

export const updateAreaFail = createAction(
  "[Area Actions] Update Area Fail",
  props<{ payload: any }>()
);

export const activateArea = createAction(
  "[Area Actions] Activate Area",
  props<{ areaId: string; payload: any }>()
);

export const activateAreaSuccess = createAction(
  "[Area Actions] Activate Area Success",
  props<{ area: AreaModel }>()
);

export const activateAreaFail = createAction(
  "[Area Actions] Activate Area Fail",
  props<{ payload: any }>()
);

export const desactivateArea = createAction(
  "[Area Actions] Desactivate Area",
  props<{ areaId: string; payload: any }>()
);

export const desactivateAreaSuccess = createAction(
  "[Area Actions] Desactivate Area Success",
  props<{ area: AreaModel }>()
);

export const desactivateAreaFail = createAction(
  "[Area Actions] Desactivate Area Fail",
  props<{ payload: any }>()
);

export const createAreaMember = createAction(
  "[Area Actions] Create Area Member",
  props<{ payload: any }>()
);

export const createAreaMemberSuccess = createAction(
  "[Area Actions] Create Area Member Success",
  props<{ area: AreaModel }>()
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
  props<{ area: AreaModel }>()
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
  props<{ area: AreaModel }>()
);

export const setResponsibleAreaMemberFail = createAction(
  "[Area Actions] Set Responsible Area Member Fail",
  props<{ payload: any }>()
);

export const clear = createAction("[Area Actions] Clear");
