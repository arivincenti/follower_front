import { createAction, props } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";
import { MemberModel } from "src/app/models/member.model";

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
  "[Area Actions] Detele Area Member Success",
  props<{ payload: AreaModel }>()
);

export const deleteAreaMemberFail = createAction(
  "[Area Actions] Detele Area Member Fail",
  props<{ payload: any }>()
);

export const clear = createAction("[Area Actions] Clear");
