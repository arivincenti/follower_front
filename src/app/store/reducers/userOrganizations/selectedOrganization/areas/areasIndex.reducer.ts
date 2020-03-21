import { combineReducers } from "@ngrx/store";
import * as AreasReducer from "./areas/areas.reducer";
import * as AreaReducer from "./area/area.reducer";

export interface state {
  areas: AreasReducer.AreasState;
  selectedArea: AreaReducer.AreaState;
}

export const initialState: state = {
  areas: AreasReducer.InitialStateAreas,
  selectedArea: AreaReducer.initialStateArea
};

export const AreasIndexReducer = combineReducers({
  areas: AreasReducer.AreasReducer,
  selectedArea: AreaReducer.AreaReducer
});
