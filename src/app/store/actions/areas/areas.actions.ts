import { createAction, props } from '@ngrx/store';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';


export const getArea = createAction(
  '[Areas Actions] Get Area',
  props<{ payload: string}>()
);

export const getAreaSuccess = createAction(
  '[Areas Actions] Get Area Success',
  props<{ payload: AreaModel }>()
);

export const getAreaFail = createAction(
  '[Areas Actions] Get Area Fail',
  props<{ payload: any }>()
);

export const getAreaMembers = createAction(
  '[Areas Actions] Get Members Area',
  props<{ payload: string}>()
);

export const getAreaMembersSuccess = createAction(
  '[Areas Actions] Get Area Members Success',
  props<{ payload: MemberModel[] }>()
);

export const getAreaMembersFail = createAction(
  '[Areas Actions] Get Area Members Fail',
  props<{ payload: any }>()
);