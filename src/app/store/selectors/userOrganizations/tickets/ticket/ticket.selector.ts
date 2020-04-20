import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { MemberModel } from "src/app/models/member.model";

const ticketState = (state: AppState) => state.userOrganizations.tickets.ticket;

export const ticket = createSelector(
  ticketState,
  (ticketState) => ticketState.ticket
);

export const ticketAreaMembers = createSelector(ticketState, (ticketState) =>
  ticketState.ticket.area.members.filter(
    (member: MemberModel) => member !== null
  )
);

export const ticketLoading = createSelector(
  ticketState,
  (ticketState) => ticketState.loading
);
