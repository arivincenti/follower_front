import { combineReducers } from '@ngrx/store';
import * as AreaMembersReducer from './areaMembers/areaMembers.reducer';
import * as AreaReducer from './area/area.reducer';

export interface state
{
  areaMembers: AreaMembersReducer.AreaMembersState,
  area: AreaReducer.AreaState
}

export const initialState: state = {
  areaMembers: AreaMembersReducer.InitialStateAreaMembers,
  area: AreaReducer.initialStateArea
};

export const AreasIndexReducer = combineReducers(
  {
    areaMembers: AreaMembersReducer.AreaMembersReducer,
    area:AreaReducer.AreaReducer
  },
  initialState
);