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

export const AddCreatedMemberToList = createAction(
  "[Members Actions] AddCreatedMemberToList Member Success",
  props<{ member: MemberModel }>()
);

export const updateMemberList = createAction(
  "[Members Actions] UpdateMemberList Member Success",
  props<{ member: MemberModel }>()
);
