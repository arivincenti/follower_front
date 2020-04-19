import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";

const areaState = (state: AppState) =>
  state.userOrganizations.organization.area;

export const area = createSelector(areaState, (areaState) => areaState.area);

export const areaLoading = createSelector(
  areaState,
  (areasState) => areasState.loading
);

export const areaError = createSelector(
  areaState,
  (areasState) => areasState.error
);
