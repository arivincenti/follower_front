import { OrganizationModel } from "src/app/models/organization.model";
import { createReducer, on, Action } from "@ngrx/store";
import * as OrganizationActions from "../../../../actions/userOrganizations/selectedOrganization/organization.actions";

export interface OrganizationState {
  organization: OrganizationModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const InitialStateOrganization: OrganizationState = {
  organization: null,
  loading: false,
  loaded: false,
  error: null
};

export const organizationReducer = createReducer(
  InitialStateOrganization,
  on(OrganizationActions.getOrganization, state => ({
    ...state,
    organization: null,
    loading: true,
    loaded: false,
    error: null
  })),
  on(OrganizationActions.getOrganizationSuccess, (state, { payload }) => ({
    ...state,
    organization: { ...payload },
    loading: false,
    loaded: true
  })),
  on(OrganizationActions.getOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(OrganizationActions.createOrganization, state => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    OrganizationActions.createOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true
    })
  ),
  on(OrganizationActions.createOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: { ...state.organization },
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(OrganizationActions.updateOrganization, state => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    OrganizationActions.updateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(OrganizationActions.updateOrganizationFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(OrganizationActions.activateOrganization, state => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    OrganizationActions.activateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(OrganizationActions.activateOrganizationFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(OrganizationActions.desactivateOrganization, state => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null
  })),
  on(
    OrganizationActions.desactivateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(OrganizationActions.desactivateOrganizationFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload }
  })),
  on(OrganizationActions.clearSelectedOrganizationState, state => ({
    ...state
  }))
);

export function OrganizationReducer(
  state: OrganizationState | undefined,
  action: Action
) {
  return organizationReducer(state, action);
}
