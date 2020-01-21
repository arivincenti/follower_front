import { createAction, props } from '@ngrx/store';
import { MemberModel } from 'src/app/models/member.model';

export const getAreaMembers = createAction(
  '[Area Members Actions] Get Area Members',
  props<{ payload: string }>()
);

export const getAreaMembersSuccess = createAction(
  '[Area Members Actions] Get Area Members Success',
  props<{ payload: MemberModel[] }>()
);

export const getAreaMembersFail = createAction(
  '[Area Members Actions] Get Area Members Fail',
  props<{ payload: any }>()
);

export const createAreaMembers = createAction(
  '[Area Members Actions] Create Area Members',
  props<{ payload: string }>()
);

export const createAreaMembersSuccess = createAction(
  '[Area Members Actions] Create Area Members Success',
  props<{ payload: MemberModel[] }>()
);

export const createAreaMembersFail = createAction(
  '[Area Members Actions] Create Area Members Fail',
  props<{ payload: any }>()
);
