import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const tickets = (state: AppState) => state.userOrganizations.tickets;

export const userTickets = createSelector(
  tickets,
  (tickets) => tickets.tickets.tickets
);

export const userTicketsLoading = createSelector(
  tickets,
  (tickets) => tickets.tickets.loading
);
