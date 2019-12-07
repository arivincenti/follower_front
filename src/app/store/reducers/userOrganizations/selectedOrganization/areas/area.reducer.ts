import { AreaModel } from 'src/app/models/area.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as AreaActions from '../../../../actions/userOrganizations/selectedOrganization/areas/area.actions';

export interface AreaState
{
  area: AreaModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialAreaState: AreaState = {
  area: null,
  loading: false,
  loaded: false,
  error: null
}

// export interface AreaMembers
// {
//   members: MemberModel[],
//   loading: boolean,
//   loaded: boolean,
//   error: any
// }

// export const initialAreaMembersState: AreaMembers = {
//   members: [],
//   loading: false,
//   loaded: false,
//   error: null
// }

// export interface AreasState
// {
//   selectedArea: SelectedAreaState,
//   areaMembers: AreaMembers
// }

// export const initialAreaState: AreasState = {
//   selectedArea: initialSelectedAreaState,
//   areaMembers: initialAreaMembersState
// }


export const areaReducer = createReducer(
  initialAreaState,
  on(AreaActions.getArea, (state) => (
    {
      ...state,
        area: null,
        loading: true,
        loaded: false,
        error: null
      }
  )),
  on(AreaActions.getAreaSuccess, (state, { payload }) => (
    {
      ...state,
        area: { ...payload },
        loading: false,
        loaded: true,
        error: null
      }
  )),
  on(AreaActions.getAreaFail, (state, { payload }) => (
    {
      ...state,
        loading: false,
        loaded: false,
        error: { ...payload }
      }
  )),
  // on(AreaActions.getAreaMembers, (state) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [],
  //       loading: true,
  //       loaded: false,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.getAreaMembersSuccess, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...payload],
  //       loading: false,
  //       loaded: true,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.getAreaMembersFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       loading: false,
  //       loaded: false,
  //       error: { ...payload }
  //     }
  //   }
  // )),
  // on(AreaActions.createAreaMember, (state) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members],
  //       loading: true,
  //       loaded: false,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.createAreaMemberSuccess, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members, { ...payload }],
  //       loading: false,
  //       loaded: true,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.createAreaMemberFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       loading: false,
  //       loaded: false,
  //       error: { ...payload }
  //     }
  //   }
  // )),
  // on(AreaActions.updateAreaMember, (state) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members],
  //       loading: true,
  //       loaded: false,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.updateAreaMemberSuccess, (state, { payload }) =>
  // {
  //   return {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members.filter(member => member._id !== payload._id), { ...payload }],
  //       loading: false,
  //       loaded: true,
  //       error: null
  //     }
  //   }
  // }
  // ),
  // on(AreaActions.updateAreaMemberFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       loading: false,
  //       loaded: false,
  //       error: { ...payload }
  //     }
  //   }
  // )),
  // on(AreaActions.deleteAreaMember, (state) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members],
  //       loading: true,
  //       loaded: false,
  //       error: null
  //     }
  //   }
  // )),
  // on(AreaActions.deleteAreaMemberSuccess, (state, { payload }) =>
  // {
  //   return {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       members: [...state.areaMembers.members.filter(member => member._id !== payload._id), { ...payload }],
  //       loading: false,
  //       loaded: true,
  //       error: null
  //     }
  //   }
  // }
  // ),
  // on(AreaActions.deleteAreaMemberFail, (state, { payload }) => (
  //   {
  //     ...state,
  //     areaMembers: {
  //       ...state.areaMembers,
  //       loading: false,
  //       loaded: false,
  //       error: { ...payload }
  //     }
  //   }
  // )),
  // on(AreaActions.clearSelectedAreaState, (state) => (
  //   {
  //     ...state,
  //     ...initialAreaState
  //   }
  // ))
)


export function AreaReducer(state: AreaState | undefined, action: Action)
{
  return areaReducer(state, action);
}