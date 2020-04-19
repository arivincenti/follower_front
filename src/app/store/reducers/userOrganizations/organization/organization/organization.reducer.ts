import { OrganizationModel } from "src/app/models/organization.model";
import { createReducer, on, Action } from "@ngrx/store";
import * as OrganizationActions from "@actions/organization";

export interface organizationState {
  organization: OrganizationModel;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialStateOrganization: organizationState = {
  organization: null,
  loading: false,
  loaded: false,
  error: null,
};

export const organizationReducer = createReducer(
  initialStateOrganization,
  on(OrganizationActions.getOrganization, (state) => ({
    ...state,
    organization: null,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(OrganizationActions.getOrganizationSuccess, (state, { organization }) => ({
    ...state,
    organization: { ...organization },
    loading: false,
    loaded: true,
    error: null,
  })),
  on(OrganizationActions.getOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(OrganizationActions.createOrganization, (state) => ({
    ...state,
    organization: null,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(
    OrganizationActions.createOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(OrganizationActions.createOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(OrganizationActions.updateOrganization, (state) => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(
    OrganizationActions.updateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(OrganizationActions.updateOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(OrganizationActions.activateOrganization, (state) => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(
    OrganizationActions.activateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(OrganizationActions.activateOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload },
  })),
  on(OrganizationActions.desactivateOrganization, (state) => ({
    ...state,
    organization: { ...state.organization },
    loading: true,
    loaded: false,
    error: null,
  })),
  on(
    OrganizationActions.desactivateOrganizationSuccess,
    (state, { organization }) => ({
      ...state,
      organization: { ...organization },
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(OrganizationActions.desactivateOrganizationFail, (state, { payload }) => ({
    ...state,
    organization: null,
    loading: false,
    loaded: false,
    error: { ...payload },
  }))
);

export function OrganizationReducer(
  state: organizationState | undefined,
  action: Action
) {
  return organizationReducer(state, action);
}
