import { createAction, props } from "@ngrx/store";
import { MemberModel } from "../../../../../../models/member.model";
import { AreaModel } from "src/app/models/area.model";

export const getMember = createAction(
  "[Member Actions] Get Member",
  props<{ payload: string }>()
);

export const getMemberSuccess = createAction(
  "[Member Actions] Get Member Success",
  props<{ payload: MemberModel }>()
);

export const getMemberFail = createAction(
  "[Member Actions] Get Member Fail",
  props<{ payload: any }>()
);

export const createMember = createAction(
  "[Member Actions] Create Member",
  props<{ payload: any }>()
);

export const createMemberSuccess = createAction(
  "[Member Actions] Create Member Success",
  props<{ member: MemberModel }>()
);

export const createMemberFail = createAction(
  "[Member Actions] Create Member Fail",
  props<{ payload: any }>()
);

export const activateMember = createAction(
  "[Member Actions] Activate Member",
  props<{ payload: any }>()
);

export const activateMemberSuccess = createAction(
  "[Member Actions] Activate Member Success",
  props<{ member: MemberModel }>()
);

export const activateMemberFail = createAction(
  "[Member Actions] Activate Member Fail",
  props<{ payload: any }>()
);

export const desactivateMember = createAction(
  "[Member Actions] Desactivate Member",
  props<{ payload: any }>()
);

export const desactivateMemberSuccess = createAction(
  "[Member Actions] Desactivate Member Success",
  props<{ member: MemberModel }>()
);

export const desactivateMemberFail = createAction(
  "[Member Actions] Desactivate Member Fail",
  props<{ payload: any }>()
);

export const clearSelectedMemberState = createAction(
  "[Member Actions] Clear Selected Member State"
);
