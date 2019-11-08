import { createReducer, on, Action } from '@ngrx/store';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { MemberModel } from 'src/app/models/member.model';

export interface OrganizationsState
{
  organizations: OrganizationModel[],
  organization: {
    organization: {
      organization: OrganizationModel,
      loading: boolean,
      loaded: boolean,
      error: any
    },
    organizationAreas: {
      areas: AreaModel[],
      loading: boolean,
      loaded: boolean,
      error: any
    },
    organizationUserAreasMember: {
      areasMember: MemberModel[],
      loading: boolean,
      loaded: boolean,
      error: any
    }
  },
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialState: OrganizationsState = {
  organizations: [],
  organization: {
    organization: {
      organization: null,
      loading: false,
      loaded: false,
      error: null
    },
    organizationAreas: {
      areas: [],
      loading: false,
      loaded: false,
      error: null
    },
    organizationUserAreasMember: {
      areasMember: [],
      loading: false,
      loaded: false,
      error: null
    }
  },
  loading: false,
  loaded: false,
  error: null
}

export const organizationsReducer = createReducer(
  initialState,
  on(OrganizationsActions.getOrganizations, (state) => (
    {
      ...state,
      loading: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationsSuccess, (state, { payload }) => (
    {
      ...state,
      organizations: [...payload],
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationsFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: {...payload}
    }
  )),
  on(OrganizationsActions.getOrganization, (state) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organization: {
          ...state.organization.organization,
          loading: true,
          loaded: false,
          error: null
        }
      },
      loading: true,
      loaded: false,
      error: null
    }
    )),
  on(OrganizationsActions.getOrganizationSuccess, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organization: {
          ...state.organization.organization,
          organization: {...payload},
          loading: false,
          loaded: true
        }
      },
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organization: {
          ...state.organization.organization,
          organization: null,
          loading: false,
          loaded: false,
          error: {...payload}
        }
      },
      loading: false,
      loaded: true,
      error: {...payload}
    }
  )),
  on(OrganizationsActions.getOrganizationAreas, (state) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organizationAreas: {
          ...state.organization.organizationAreas,
          loading: true,
          loaded: false
        }
      },
      loading: false,
      loaded: true,
      error: null
    }
    )),
  on(OrganizationsActions.getOrganizationAreasSuccess, (state, { areas }) => (
    {
      ...state,
      organization:  { 
        ...state.organization,
        organizationAreas: {
          ...state.organization.organizationAreas,
          areas: [...areas],
          loading: false,
          loaded: true
        }
      },
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organizationAreas: {
          ...state.organization.organizationAreas,
          areas: [],
          loading: false,
          loaded: false,
          error: {...payload}
        }
      },
      loading: false,
      loaded: false,
      error: {...payload}
    }
  )),
  on(OrganizationsActions.getOrganizationUserAreaMember, (state) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organizationUserAreasMember: {
          ...state.organization.organizationUserAreasMember,
          areasMember: [],
          loading: true,
          loaded: false,
          error: null
        }
      },
      loading: true,
      loaded: false,
      error: null
    }
    )),
  on(OrganizationsActions.getOrganizationUserAreaMemberSuccess, (state, { memberAreas }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organizationUserAreasMember: {
          ...state.organization.organizationUserAreasMember,
          areasMember: [...memberAreas],
          loading: false,
          loaded: true,
          error: null
        }
      },
      loading: false,
      loaded: true,
      error: null
    }
  )),
  on(OrganizationsActions.getOrganizationUserAreaMemberFail, (state, { payload }) => (
    {
      ...state,
      organization: {
        ...state.organization,
        organizationUserAreasMember: {
          ...state.organization.organizationUserAreasMember,
          areasMember: [],
          loading: false,
          loaded: false,
          error: {...payload}
        }
      },
      loading: false,
      loaded: false,
      error: {...payload}
    }
  )),
  on(OrganizationsActions.clearState, (state) => (
    {
      ...state,
      ...initialState
    }
  ))
);

export function OrganizationsReducer(state: OrganizationsState | undefined, action: Action)
{
  return organizationsReducer(state, action);
}