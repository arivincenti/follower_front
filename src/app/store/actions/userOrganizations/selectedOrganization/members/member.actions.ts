import { createAction, props } from '@ngrx/store';
import { MemberModel } from  '../../../../../models/member.model';

export const getMember = createAction(
  '[Member Actions] Get Member',
  props<{ payload: string }>()
);

export const getMemberSuccess = createAction(
  '[Members Actions] Get Member Success',
  props<{ payload: MemberModel }>()
);

export const getMemberFail = createAction(
  '[Members Actions] Get Member Fail',
  props<{ payload: any }>()
);

export const clearSelectedMemberState = createAction(
  '[Members Actions] Clear Selected Member State'
);