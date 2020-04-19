import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";
import { MemberModel } from "src/app/models/member.model";

const areaState = (state: AppState) =>
  state.userOrganizations.organization.area;

export const areaMembers = createSelector(
  areaState,
  (areaState) => areaState.area.members
);
