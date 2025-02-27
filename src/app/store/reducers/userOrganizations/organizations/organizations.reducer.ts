import { createReducer, on, Action } from "@ngrx/store";
import * as OrganizationsActions from "@actions/organizations";
import { OrganizationModel } from "../../../../models/organization.model";

export interface OrganizationsState {
  organizations: OrganizationModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialOrganizationsState: OrganizationsState = {
  organizations: [],
  loading: false,
  loaded: false,
  error: null,
};

export const organizationsReducer = createReducer(
  initialOrganizationsState,
  on(OrganizationsActions.getOrganizations, (state) => ({
    ...state,
    organizations: [],
    loading: true,
    loaded: false,
    error: null,
  })),
  on(OrganizationsActions.getOrganizationsSuccess, (state, { payload }) => ({
    ...state,
    organizations: [...payload],
    loading: false,
    loaded: true,
  })),
  on(OrganizationsActions.getOrganizationsFail, (state, { payload }) => ({
    ...state,
    organizations: [],
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(
    OrganizationsActions.addCreatedOrganizationToList,
    (state, { organization }) => ({
      ...state,
      organizations: [...state.organizations, { ...organization }],
      loading: false,
      loaded: true,
    })
  ),
  on(OrganizationsActions.updateOrganizationList, (state, { organization }) => {
    var index = state.organizations.findIndex(
      (data) => data._id === organization._id
    );
    state.organizations.splice(index, 1, { ...organization });
    return {
      ...state,
      organizations: [...state.organizations],
      loading: false,
      loaded: true,
    };
  }),
  on(OrganizationsActions.clearState, (state) => ({
    ...state,
    ...initialOrganizationsState,
  }))
);

export function OrganizationsReducer(
  state: OrganizationsState | undefined,
  action: Action
) {
  return organizationsReducer(state, action);
}
