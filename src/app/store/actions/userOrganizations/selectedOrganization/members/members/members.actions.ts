import { createAction, props } from '@ngrx/store';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationModel } from 'src/app/models/organization.model';

export const getMembers = createAction(
  '[Members Actions] Get Members',
  props<{ payload: OrganizationModel }>()
);

export const getMembersSuccess = createAction(
  '[Members Actions] Get Members Success',
  props<{ payload: MemberModel[] }>()
);

export const getMembersFail = createAction(
  '[Members Actions] Get Members Fail',
  props<{ payload: any }>()
);

export const createMember = createAction(
  '[Members Actions] Create Member',
  props<{ payload: any }>()
);

export const createMemberSuccess = createAction(
  '[Members Actions] Create Area Success',
  props<{ payload: MemberModel }>()
);

export const createMemberFail = createAction(
  '[Members Actions] Create Member Fail',
  props<{ payload: any }>()
);

export const updateMember = createAction(
  '[Members Actions] Update Member',
  props<{ payload: MemberModel }>()
);

export const updateMemberSuccess = createAction(
  '[Members Actions] Update Member Success',
  props<{ payload: MemberModel }>()
);

export const updateMemberFail = createAction(
  '[Members Actions] Update Member Fail',
  props<{ payload: any }>()
);

export const inactiveMember = createAction(
  '[Members Actions] Inactive Member',
  props<{ payload: any }>()
);

export const inactiveMemberSuccess = createAction(
  '[Members Actions] Inactive Area Success',
  props<{ payload: MemberModel }>()
);

export const inactiveMemberFail = createAction(
  '[Members Actions] Inactive Member Fail',
  props<{ payload: any }>()
);
