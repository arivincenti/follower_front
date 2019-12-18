import { createAction, props } from '@ngrx/store';
import { MemberModel } from  '../../../../../../models/member.model';
import { AreaModel } from 'src/app/models/area.model';

export const getMember = createAction(
  '[Member Actions] Get Member',
  props<{ payload: string }>()
);

export const getMemberSuccess = createAction(
  '[Member Actions] Get Member Success',
  props<{ payload: MemberModel }>()
);

export const getMemberFail = createAction(
  '[Member Actions] Get Member Fail',
  props<{ payload: any }>()
);

export const clearSelectedMemberState = createAction(
  '[Member Actions] Clear Selected Member State'
);