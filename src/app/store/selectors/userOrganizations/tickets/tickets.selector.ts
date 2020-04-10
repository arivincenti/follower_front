import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const tickets = (state: AppState) => state.userOrganizations.tickets;

export const userTickets = createSelector(
  tickets,
  (tickets) => tickets.userTickets.tickets
);

export const userTicketsLoading = createSelector(
  tickets,
  (tickets) => tickets.userTickets.loading
);
