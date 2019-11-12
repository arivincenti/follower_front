import { createReducer, on, Action } from '@ngrx/store';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';

export interface OrganizationAreas
{
  organizationAreas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationAreas = {
  organizationAreas: [],
  loading: false,
  loaded: false,
  error: null
}

export interface OrganizationUserAreas
{
  organizationUserAreas: AreaModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganizationUserAreas = {
  organizationUserAreas: [],
  loading: false,
  loaded: false,
  error: null
}

export interface Organization
{
  organization: OrganizationModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const InitialStateOrganization = {
  organization: null,
  loading: false,
  loaded: false,
  error: null
}

export interface OrganizationState
{
  organization: Organization,
  organizationAreas: OrganizationAreas,
  organizationUserAreas: OrganizationUserAreas
}

export const initialSelectedOrganizationState: OrganizationState = {
  organization: InitialStateOrganization,
  organizationAreas: InitialStateOrganizationAreas,
  organizationUserAreas: InitialStateOrganizationUserAreas
}

export interface OrganizationsState
{
  organizations: OrganizationModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialOrganizationsState: OrganizationsState = {
  organizations: [],
  loading: false,
  loaded: false,
  error: null
}

export interface State
{
  organizations: OrganizationsState,
  organizationSelected: OrganizationState
}

export const initialState: State = {
  organizations: initialOrganizationsState,
  organizationSelected: initialSelectedOrganizationState
}

export const organizationsReducer = createReducer(
  initialState,
  on(OrganizationsActions.getUserOrganizations, (state) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        loading: true,
        loaded: false
      }
    }
  )),
  on(OrganizationsActions.getUserOrganizationsSuccess, (state, { payload }) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        organizations: [...payload],
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationsActions.getUserOrganizationsFail, (state, { payload }) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        organizations: [],
        loading: false,
        loaded: false,
        error: { payload }
      }
    }
  )),
  on(OrganizationsActions.getOrganization, (state) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organization: {
          ...state.organizationSelected.organization,
          loading: true,
          loaded: false
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationSuccess, (state, { payload }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organization: {
          ...state.organizationSelected.organization,
          organization: { ...payload },
          loading: false,
          loaded: true
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organization: {
          ...state.organizationSelected.organization,
          organization: null,
          loading: false,
          loaded: false,
          error: { ...payload }
        }
      }
    }
  )),
  on(OrganizationsActions.createOrganization, (state) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        loading: true,
        loaded: false
      }
    }
  )),
  on(OrganizationsActions.createOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        organizations: [...state.organizations.organizations, { ...organization }],
        loading: false,
        loaded: true
      }
    }
  )),
  on(OrganizationsActions.createOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        organizations: [...state.organizations.organizations],
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationsActions.deleteOrganization, (state) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        loading: true,
        loaded: false
      }
    }
  )),
  on(OrganizationsActions.deleteOrganizationSuccess, (state, { organization }) =>
  {
    return {
      ...state,
      organizations: {
        ...state.organizations,
        organizations: [...state.organizations.organizations.filter(data => data._id !== organization._id), { ...organization }],
        loading: false,
        loaded: true
      },
      organizationSelected: {
        ...state.organizationSelected,
        organization: {
          ...state.organizationSelected.organization,
          organization: { ...organization },
          loading: false,
          loaded: true
        }
      }
    }
  }),
  on(OrganizationsActions.deleteOrganizationFail, (state, { payload }) => (
    {
      ...state,
      organizations: {
        ...state.organizations,
        loading: false,
        loaded: false,
        error: { ...payload }
      },
      organizationSelected: {
        ...state.organizationSelected,
        error: { ...payload }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationAreas, (state) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationAreas: {
          ...state.organizationSelected.organizationAreas,
          loading: true,
          loaded: false
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationAreasSuccess, (state, { areas }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationAreas: {
          ...state.organizationSelected.organizationAreas,
          organizationAreas: [...areas],
          loading: false,
          loaded: true
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationAreas: {
          ...state.organizationSelected.organizationAreas,
          organizationAreas: [],
          loading: false,
          loaded: false,
          error: { ...payload }
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationUserAreas, (state) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationUserAreas: {
          ...state.organizationSelected.organizationUserAreas,
          loading: true,
          loaded: false
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationUserAreasSuccess, (state, { userAreas }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationUserAreas: {
          ...state.organizationSelected.organizationUserAreas,
          organizationUserAreas: [...userAreas],
          loading: false,
          loaded: true
        }
      }
    }
  )),
  on(OrganizationsActions.getOrganizationUserAreasFail, (state, { payload }) => (
    {
      ...state,
      organizationSelected: {
        ...state.organizationSelected,
        organizationUserAreas: {
          ...state.organizationSelected.organizationUserAreas,
          organizationUserAreas: [],
          loading: false,
          loaded: false,
          error: { ...payload }
        }
      }
    }
  )),
  on(OrganizationsActions.clearSelectedOrganizationState, (state) => (
    {
      ...state,
      organizationSelected: {
        ...initialSelectedOrganizationState
      }
    }
  )),
  on(OrganizationsActions.clearState, (state) => (
    {
      ...state,
      organizationSelected: {
        ...initialSelectedOrganizationState
      },
      organizations: {
        ...initialOrganizationsState
      }
    }
  ))
);

export function OrganizationsReducer(state: State | undefined, action: Action)
{
  return organizationsReducer(state, action);
}