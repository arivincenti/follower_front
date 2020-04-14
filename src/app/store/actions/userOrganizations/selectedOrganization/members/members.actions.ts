import { createAction, props } from "@ngrx/store";
import { MemberModel } from "src/app/models/member.model";
import { OrganizationModel } from "src/app/models/organization.model";

export const getMembers = createAction(
  "[Members Actions] Get Members",
  props<{ payload: OrganizationModel }>()
);

export const getMembersSuccess = createAction(
  "[Members Actions] Get Members Success",
  props<{ payload: MemberModel[] }>()
);

export const getMembersFail = createAction(
  "[Members Actions] Get Members Fail",
  props<{ payload: any }>()
);

export const createMember = createAction(
  "[Member Actions] Create Member",
  props<{ payload: any }>()
);

export const createMemberSuccess = createAction(
  "[Members Actions] Create Member Success",
  props<{ member: MemberModel }>()
);

export const createMemberFail = createAction(
  "[Members Actions] Create Member Fail",
  props<{ payload: any }>()
);

export const activateMember = createAction(
  "[Members Actions] Activate Member",
  props<{ payload: any }>()
);

export const activateMemberSuccess = createAction(
  "[Members Actions] Activate Member Success",
  props<{ member: MemberModel }>()
);

export const activateMemberFail = createAction(
  "[Members Actions] Activate Member Fail",
  props<{ payload: any }>()
);

export const desactivateMember = createAction(
  "[Members Actions] Desactivate Member",
  props<{ payload: any }>()
);

export const desactivateMemberSuccess = createAction(
  "[Members Actions] Desactivate Member Success",
  props<{ member: MemberModel }>()
);

export const desactivateMemberFail = createAction(
  "[Members Actions] Desactivate Member Fail",
  props<{ payload: any }>()
);

export const addCreatedMemberToList = createAction(
  "[Members Actions] Add Created Member To List",
  props<{ member: MemberModel }>()
);

export const updateMemberList = createAction(
  "[Members Actions] UpdateMemberList Member Success",
  props<{ member: MemberModel }>()
);
