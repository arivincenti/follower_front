import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";

const areasState = (state: AppState) =>
  state.userOrganizations.organization.areas;

export const areas = createSelector(
  areasState,
  (areasState) => areasState.areas
);

export const areasLoading = createSelector(
  areasState,
  (areasState) => areasState.loading
);

export const area = createSelector(areasState, (areasState, area_id: string) =>
  areasState.areas.find((area: AreaModel) => area._id === area_id)
);
