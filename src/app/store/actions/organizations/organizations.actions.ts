import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';

export const getOrganizations = createAction(
  '[Organizations Actions] Get Organizations',
  props<{ payload: string }>()
);

export const getOrganizationsSuccess = createAction(
  '[Organizations Actions] Get Organizations Success',
  props<{ payload: OrganizationModel[] }>()
);

export const getOrganizationsFail = createAction(
  '[Organizations Actions] Get Organizations Fail',
  props<{ payload: any }>()
);

export const getOrganization = createAction(
  '[Organizations Actions] Get Organization',
  props<{ payload: string }>()
);

export const getOrganizationSuccess = createAction(
  '[Organizations Actions] Get Organization Success',
  props<{ payload: OrganizationModel }>()
);

export const getOrganizationFail = createAction(
  '[Organizations Actions] Get Organization Fail',
  props<{ payload: any }>()
);

export const getOrganizationAreas = createAction(
  '[Organizations Actions] Get Organization Areas',
  props<{ organization: string }>()
);

export const getOrganizationAreasSuccess = createAction(
  '[Organizations Actions] Get Organization Areas Success',
  props<{ areas: AreaModel[] }>()
);

export const getOrganizationAreasFail = createAction(
  '[Organizations Actions] Get Organization Areas Fail',
  props<{ payload: any }>()
);

export const getOrganizationUserAreaMember = createAction(
  '[Organizations Actions] Get Organization User Areas Member',
  props<{ user: string, organization: string }>()
);

export const getOrganizationUserAreaMemberSuccess = createAction(
  '[Organizations Actions] Get Organization Areas User Member Success',
  props<{ memberAreas: MemberModel[] }>()
);

export const getOrganizationUserAreaMemberFail = createAction(
  '[Organizations Actions] Get Organization Areas User Member Fail',
  props<{ payload: any }>()
);

export const clearState = createAction(
  '[Organizations Actions] Clear State'
);