import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';


export const getOrganization = createAction(
  '[Organizations Actions] Get Organization',
  props<{ organization: string, user: string }>()
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
  props<{ payload: string }>()
);

export const getOrganizationAreasSuccess = createAction(
  '[Organizations Actions] Get Organization Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getOrganizationAreasFail = createAction(
  '[Organizations Actions] Get Organization Areas Fail',
  props<{ payload: any }>()
);

export const createOrganizationArea = createAction(
  '[Organizations Actions] Create Organization Area',
  props<{ payload: any }>()
);

export const createOrganizationAreaSuccess = createAction(
  '[Organizations Actions] Create Organization Area Success',
  props<{ payload: AreaModel }>()
);

export const createOrganizationAreaFail = createAction(
  '[Organizations Actions] Create Organization Area Fail',
  props<{ payload: any }>()
);

export const updateOrganizationArea = createAction(
  '[Organizations Actions] Update Organization Area',
  props<{ areaId: string, payload: any }>()
);

export const updateOrganizationAreaSuccess = createAction(
  '[Organizations Actions] Update Organization Area Success',
  props<{ payload: AreaModel }>()
);

export const updateOrganizationAreaFail = createAction(
  '[Organizations Actions] Update Organization Area Fail',
  props<{ payload: any }>()
);

export const deleteOrganizationArea = createAction(
  '[Organizations Actions] Delete Organization Area',
  props<{ payload: any }>()
);

export const deleteOrganizationAreaSuccess = createAction(
  '[Organizations Actions] Delete Organization Area Success',
  props<{ payload: AreaModel }>()
);

export const deleteOrganizationAreaFail = createAction(
  '[Organizations Actions] Delete Organization Area Fail',
  props<{ payload: any }>()
);

export const getOrganizationUserAreas = createAction(
  '[Organizations Actions] Get Organization User Areas',
  props<{ user: string, organization: string }>()
);

export const getOrganizationUserAreasSuccess = createAction(
  '[Organizations Actions] Get Organization User Areas Success',
  props<{ payload: AreaModel[] }>()
);

export const getOrganizationUserAreasFail = createAction(
  '[Organizations Actions] Get Organization User Areas Fail',
  props<{ payload: any }>()
);

export const clearSelectedOrganizationState = createAction(
  '[Organizations Actions] Clear Selected Organization State'
);