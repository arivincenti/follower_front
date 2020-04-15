import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { AreaModel } from "src/app/models/area.model";
import { MemberModel } from "src/app/models/member.model";

const areasState = (state: AppState) =>
  state.userOrganizations.organization.areas;

export const areaMembers = createSelector(
  areasState,
  (areasState, area_id: string) => {
    let area = areasState.areas.find((area: AreaModel) => area._id === area_id);
    return area.members.filter((member: MemberModel) => member !== null);
  }
);
