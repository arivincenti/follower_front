import { createAction, props } from "@ngrx/store";
import { AreaModel } from "../../../../../models/area.model";
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

// export const createArea = createAction(
//   "[Areas Actions] Create Area",
//   props<{ payload: any }>()
// );

// export const createAreaSuccess = createAction(
//   "[Areas Actions] Create Area Success",
//   props<{ area: AreaModel }>()
// );

// export const createAreaFail = createAction(
//   "[Areas Actions] Create Area Fail",
//   props<{ payload: any }>()
// );

// export const updateArea = createAction(
//   "[Areas Actions] Update Area",
//   props<{ areaId: string; payload: any }>()
// );

// export const updateAreaSuccess = createAction(
//   "[Areas Actions] Update Area Success",
//   props<{ payload: AreaModel }>()
// );

// export const updateAreaFail = createAction(
//   "[Areas Actions] Update Area Fail",
//   props<{ payload: any }>()
// );

// export const activateArea = createAction(
//   "[Areas Actions] Activate Area",
//   props<{ areaId: string; payload: any }>()
// );

// export const activateAreaSuccess = createAction(
//   "[Areas Actions] Activate Area Success",
//   props<{ payload: AreaModel }>()
// );

// export const activateAreaFail = createAction(
//   "[Areas Actions] Activate Area Fail",
//   props<{ payload: any }>()
// );

// export const desactivateArea = createAction(
//   "[Areas Actions] Desactivate Area",
//   props<{ areaId: string; payload: any }>()
// );

// export const desactivateAreaSuccess = createAction(
//   "[Areas Actions] Desactivate Area Success",
//   props<{ payload: AreaModel }>()
// );

// export const desactivateAreaFail = createAction(
//   "[Areas Actions] Desactivate Area Fail",
//   props<{ payload: any }>()
// );

// export const createAreaMember = createAction(
//   "[Areas Actions] Create Area Member",
//   props<{ payload: any }>()
// );

// export const createAreaMemberSuccess = createAction(
//   "[Areas Actions] Create Area Member Success",
//   props<{ payload: AreaModel }>()
// );

// export const createAreaMemberFail = createAction(
//   "[Areas Actions] Create Area Member Fail",
//   props<{ payload: any }>()
// );

// export const deleteAreaMember = createAction(
//   "[Areas Actions] Delete Area Member",
//   props<{ payload: any }>()
// );

// export const deleteAreaMemberSuccess = createAction(
//   "[Areas Actions] Delete Area Member Success",
//   props<{ payload: AreaModel }>()
// );

// export const deleteAreaMemberFail = createAction(
//   "[Areas Actions] Delete Area Member Fail",
//   props<{ payload: any }>()
// );

// export const setResponsibleAreaMember = createAction(
//   "[Areas Actions] Set Responsible Area Member",
//   props<{ payload: any }>()
// );

// export const setResponsibleAreaMemberSuccess = createAction(
//   "[Areas Actions] Set Responsible Area Member Success",
//   props<{ payload: AreaModel }>()
// );

// export const setResponsibleAreaMemberFail = createAction(
//   "[Areas Actions] Set Responsible Area Member Fail",
//   props<{ payload: any }>()
// );

export const addCreatedAreaToList = createAction(
  "[Areas Actions] Add Created Area To List",
  props<{ area: AreaModel }>()
);

export const updateAreasList = createAction(
  "[Areas Actions] Update Areas List",
  props<{ area: AreaModel }>()
);

export const clearAreasState = createAction(
  "[Areas Actions] Clear Areas State"
);
