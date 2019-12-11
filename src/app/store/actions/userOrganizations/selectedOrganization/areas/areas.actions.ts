import { createAction, props } from '@ngrx/store';
import { AreaModel } from '../../../../../models/area.model';
import { OrganizationModel } from 'src/app/models/organization.model';

export const getAreas = createAction(
  '[Areas Actions] Get Areas',
  props<{ payload: OrganizationModel }>()
);

export const getAreasSuccess = createAction(
  '[Areas Actions] Get Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getAreasFail = createAction(
  '[Areas Actions] Get Areas Fail',
  props<{ payload: any }>()
);

export const createArea = createAction(
  '[Areas Actions] Create Area',
  props<{ payload: any }>()
);

export const createAreaSuccess = createAction(
  '[Areas Actions] Create Area Success',
  props<{ payload: AreaModel }>()
);

export const createAreaFail = createAction(
  '[Areas Actions] Create Area Fail',
  props<{ payload: any }>()
);

export const updateArea = createAction(
  '[Areas Actions] Update Area',
  props<{ areaId: string, payload: any }>()
);

export const updateAreaSuccess = createAction(
  '[Areas Actions] Update Area Success',
  props<{ payload: AreaModel }>()
);

export const updateAreaFail = createAction(
  '[Areas Actions] Update Area Fail',
  props<{ payload: any }>()
);

export const deleteArea = createAction(
  '[Areas Actions] Delete Area',
  props<{ payload: any }>()
);

export const deleteAreaSuccess = createAction(
  '[Areas Actions] Delete Area Success',
  props<{ payload: AreaModel }>()
);

export const deleteAreaFail = createAction(
  '[Areas Actions] Delete Area Fail',
  props<{ payload: any }>()
);


// export const getArea = createAction(
//   '[Areas Actions] Get Area',
//   props<{ payload: string}>()
// );

// export const getAreaSuccess = createAction(
//   '[Areas Actions] Get Area Success',
//   props<{ payload: AreaModel }>()
// );

// export const getAreaFail = createAction(
//   '[Areas Actions] Get Area Fail',
//   props<{ payload: any }>()
// );

// export const getAreaMembers = createAction(
//   '[Areas Actions] Get Members Area',
//   props<{ payload: string}>()
// );

// export const getAreaMembersSuccess = createAction(
//   '[Areas Actions] Get Area Members Success',
//   props<{ payload: MemberModel[] }>()
// );

// export const getAreaMembersFail = createAction(
//   '[Areas Actions] Get Area Members Fail',
//   props<{ payload: any }>()
// );

// export const createAreaMember = createAction(
//   '[Areas Actions] Create Member Area',
//   props<{ payload: any}>()
// );

// export const createAreaMemberSuccess = createAction(
//   '[Areas Actions] Create Area Member Success',
//   props<{ payload: MemberModel }>()
// );

// export const createAreaMemberFail = createAction(
//   '[Areas Actions] Create Area Member Fail',
//   props<{ payload: any }>()
// );

// export const updateAreaMember = createAction(
//   '[Areas Actions] Update Member Area',
//   props<{ payload: MemberModel}>()
// );

// export const updateAreaMemberSuccess = createAction(
//   '[Areas Actions] Update Area Member Success',
//   props<{ payload: MemberModel }>()
// );

// export const updateAreaMemberFail = createAction(
//   '[Areas Actions] Update Area Member Fail',
//   props<{ payload: any }>()
// );

// export const deleteAreaMember = createAction(
//   '[Areas Actions] Delete Member Area',
//   props<{ payload: MemberModel}>()
// );

// export const deleteAreaMemberSuccess = createAction(
//   '[Areas Actions] Delete Area Member Success',
//   props<{ payload: MemberModel }>()
// );

// export const deleteAreaMemberFail = createAction(
//   '[Areas Actions] Delete Area Member Fail',
//   props<{ payload: any }>()
// );


// export const clearSelectedAreaState = createAction(
//   '[Areas Actions] Clear Selected Area State'
// );