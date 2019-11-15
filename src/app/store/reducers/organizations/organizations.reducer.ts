import { createReducer, on, Action, ActionReducer, combineReducers } from '@ngrx/store';
import * as OrganizationsActions from '../../actions/organizations/organizations.actions';
import { OrganizationModel } from '../../../models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
// import * as AreasReducer from '../../reducers/areas/areas.reducer';


// export interface Areas
// {
//   areas: AreaModel[],
//   loading: boolean,
//   loaded: boolean,
//   error: any
// }

// export const InitialStateAreas = {
//   areas: [],
//   loading: false,
//   loaded: false,
//   error: null
// }

// export interface SelectedArea
// {
//   area: AreaModel,
//   loading: boolean,
//   loaded: boolean,
//   error: any
// }

// export const InitialStateSelectedArea = {
//   area: null,
//   loading: false,
//   loaded: false,
//   error: null
// }

// export interface OrganizationAreas
// {
//   organizationAreas: Areas,
//   selectedArea: SelectedArea
// }

// export const InitialStateOrganizationAreas = {
//   organizationAreas: InitialStateAreas,
//   selectedArea: InitialStateSelectedArea
// }

// export interface OrganizationUserAreas
// {
//   areas: AreaModel[],
//   loading: boolean,
//   loaded: boolean,
//   error: any
// }

// export const InitialStateOrganizationUserAreas = {
//   areas: [],
//   loading: false,
//   loaded: false,
//   error: null
// }

// export interface Organization
// {
//   organization: OrganizationModel,
//   loading: boolean,
//   loaded: boolean,
//   error: any
// }

// export const InitialStateOrganization = {
//   organization: null,
//   loading: false,
//   loaded: false,
//   error: null
// }

// export interface SelectedOrganizationState
// {
//   organization: Organization,
//   organizationAreas: OrganizationAreas,
//   organizationUserAreas: OrganizationUserAreas
// }

// export const initialSelectedOrganizationState: SelectedOrganizationState = {
//   organization: InitialStateOrganization,
//   organizationAreas: InitialStateOrganizationAreas,
//   organizationUserAreas: InitialStateOrganizationUserAreas
// }

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

// export interface State
// {
//   organizations: OrganizationsState,
//   selectedOrganization: SelectedOrganizationState
// }

// export const initialState: State = {
//   organizations: initialOrganizationsState,
//   selectedOrganization: initialSelectedOrganizationState
// }

export const organizationsReducer = createReducer(
  initialOrganizationsState,
  on(OrganizationsActions.getUserOrganizations, (state) => (
    {
      ...state,
      organizations: [],
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.getUserOrganizationsSuccess, (state, { payload }) => (
    {
      ...state,
      organizations: [...payload],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationsActions.getUserOrganizationsFail, (state, { payload }) => (
    {
      ...state,
      organizations: [],
      loading: false,
      loaded: false,
      error: { payload }
    }
  )),
  // on(OrganizationsActions.getOrganization, (state) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organization: {
  //         ...state.selectedOrganization.organization,
  //         loading: true,
  //         loaded: false
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationSuccess, (state, { payload }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organization: {
  //         ...state.selectedOrganization.organization,
  //         organization: { ...payload },
  //         loading: false,
  //         loaded: true
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organization: {
  //         ...state.selectedOrganization.organization,
  //         organization: null,
  //         loading: false,
  //         loaded: false,
  //         error: { ...payload }
  //       }
  //     }
  //   }
  // )),
  on(OrganizationsActions.createOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.createOrganizationSuccess, (state, { organization }) => (
    {
      ...state,
      organizations: [...state.organizations, { ...organization }],
      loading: false,
      loaded: true
    }
  )),
  on(OrganizationsActions.createOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  on(OrganizationsActions.deleteOrganization, (state) => (
    {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  )),
  on(OrganizationsActions.deleteOrganizationSuccess, (state, { organization }) =>
  {
    return {
      ...state,
      organizations: [...state.organizations.filter(data => data._id !== organization._id), { ...organization }],
      loading: false,
      loaded: true
    }
  }),
  on(OrganizationsActions.deleteOrganizationFail, (state, { payload }) => (
    {
      ...state,
      loading: false,
      loaded: false,
      error: { ...payload }
    }
  )),
  // on(OrganizationsActions.getOrganizationAreas, (state) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         organizationAreas: {
  //           ...state.selectedOrganization.organizationAreas.organizationAreas,
  //           loading: true,
  //           loaded: false
  //         }
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationAreasSuccess, (state, { areas }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         organizationAreas: {
  //           ...state.selectedOrganization.organizationAreas.organizationAreas,
  //           areas: [...areas],
  //           loading: false,
  //           loaded: true
  //         }
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationAreasFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         organizationAreas: {
  //           ...state.selectedOrganization.organizationAreas.organizationAreas,
  //           loading: false,
  //           loaded: false,
  //           error: { ...payload }
  //         }
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.createOrganizationArea, (state) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         loading: true,
  //         loaded: false
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.createOrganizationAreaSuccess, (state, { area }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         organizationAreas: {
  //           ...state.selectedOrganization.organizationAreas.organizationAreas,
  //           areas: [...state.selectedOrganization.organizationAreas.organizationAreas.areas, { ...area }],
  //           loading: false,
  //           loaded: true
  //         }

  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.createOrganizationAreaFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationAreas: {
  //         ...state.selectedOrganization.organizationAreas,
  //         organizationAreas: {
  //           ...state.selectedOrganization.organizationAreas.organizationAreas,
  //           areas: [...state.selectedOrganization.organizationAreas.organizationAreas.areas],
  //           loading: false,
  //           loaded: false,
  //           error: { ...payload }
  //         }
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationUserAreas, (state) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationUserAreas: {
  //         ...state.selectedOrganization.organizationUserAreas,
  //         loading: true,
  //         loaded: false
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationUserAreasSuccess, (state, { userAreas }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationUserAreas: {
  //         ...state.selectedOrganization.organizationUserAreas,
  //         areas: [...userAreas],
  //         loading: false,
  //         loaded: true
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.getOrganizationUserAreasFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...state.selectedOrganization,
  //       organizationUserAreas: {
  //         ...state.selectedOrganization.organizationUserAreas,
  //         areas: [],
  //         loading: false,
  //         loaded: false,
  //         error: { ...payload }
  //       }
  //     }
  //   }
  // )),
  // on(OrganizationsActions.clearSelectedOrganizationState, (state) => (
  //   {
  //     ...state,
  //     selectedOrganization: {
  //       ...initialSelectedOrganizationState
  //     }
  //   }
  // )),
  on(OrganizationsActions.clearState, (state) => (
    {
      ...state,
      ...initialOrganizationsState
    }
  ))
);


export function OrganizationsReducer(state: OrganizationsState | undefined, action: Action)
{
  return organizationsReducer(state, action);
}