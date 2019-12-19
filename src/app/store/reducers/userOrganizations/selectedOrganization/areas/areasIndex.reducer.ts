import { combineReducers } from '@ngrx/store';
import * as AreasReducer from './areas/areas.reducer';
import * as AreaIndexReducer from './area/areaIndex.reducer';

export interface state
{
  areas: AreasReducer.AreasState,
  selectedArea: AreaIndexReducer.state
}

export const initialState: state = {
  areas: AreasReducer.InitialStateAreas,
  selectedArea: AreaIndexReducer.initialState
};

export const AreasIndexReducer = combineReducers(
  {
    areas: AreasReducer.AreasReducer,
    selectedArea: AreaIndexReducer.AreasIndexReducer
  },
  initialState
);