import { AreaModel } from 'src/app/models/area.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as AreasActions from '../../actions/areas/areas.actions';
import { MemberModel } from 'src/app/models/member.model';

export interface SelectedAreaState
{
  area: AreaModel,
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialSelectedAreaState: SelectedAreaState = {
  area: null,
  loading: false,
  loaded: false,
  error: null
}

export interface AreaMembers
{
  members: MemberModel[],
  loading: boolean,
  loaded: boolean,
  error: any
}

export const initialAreaMembersState: AreaMembers = {
  members: [],
  loading: false,
  loaded: false,
  error: null
}

export interface AreasState
{
  selectedArea: SelectedAreaState,
  areaMembers: AreaMembers
}

export const initialAreaState: AreasState = {
  selectedArea: initialSelectedAreaState,
  areaMembers: initialAreaMembersState
}

export const areasReducer = createReducer(
  initialAreaState,
  on(AreasActions.getArea, (state) => (
    {
      ...state,
      selectedArea: {
        ...state.selectedArea,
        area: null,
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(AreasActions.getAreaSuccess, (state, { payload }) => (
    {
      ...state,
      selectedArea: {
        ...state.selectedArea,
        area: { ...payload },
        loading: false,
        loaded: true,
        error: null
      }
    }
  )),
  on(AreasActions.getAreaFail, (state, { payload }) => (
    {
      ...state,
      selectedArea: {
        ...state.selectedArea,
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(AreasActions.getAreaMembers, (state) => (
    {
      ...state,
      areaMembers: {
        ...state.areaMembers,
        members: [],
        loading: true,
        loaded: false,
        error: null
      }
    }
  )),
  on(AreasActions.getAreaMembersSuccess, (state, { payload }) => (
    {
      ...state,
      areaMembers: {
        ...state.areaMembers,
        members: [...payload],
        loading: false,
        loaded: true,
        error: null
      }
    }
  )),
  on(AreasActions.getAreaMembersFail, (state, { payload }) => (
    {
      ...state,
      areaMembers: {
        ...state.areaMembers,
        loading: false,
        loaded: false,
        error: { ...payload }
      }
    }
  )),
  on(AreasActions.clearSelectedAreaState, (state) => (
    {
      ...state,
      ...initialAreaState
    }
  ))
)


export function AreasReducer(state: AreasState | undefined, action: Action)
{
  return areasReducer(state, action);
}