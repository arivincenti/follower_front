import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { TicketModel } from "src/app/models/ticketModel";
import { AreaModel } from "src/app/models/area.model";

const tickets = (state: AppState) => state.userOrganizations.tickets;
const area = (state: AppState) =>
  state.userOrganizations.organization.area.area;
const user = (state: AppState) => state.auth.user;

export const userTickets = createSelector(
  tickets,
  (tickets) => tickets.tickets.tickets
);

export const userTicketsLoading = createSelector(
  tickets,
  (tickets) => tickets.tickets.loading
);

export const userTicketsChart = createSelector(tickets, user, (tickets, user) =>
  tickets.tickets.tickets
    .filter((ticket: TicketModel) => ticket.created_by._id === user._id)
    .map((ticket) => {
      let data = {
        month: new Date(ticket.created_at).getMonth(),
        status: ticket.status,
      };
      return data;
    })
);

export const areaTicketsChart = createSelector(
  tickets,
  (tickets, area: AreaModel) =>
    tickets.tickets.tickets
      .filter((ticket: TicketModel) => ticket.area._id === area._id)
      .map((ticket: TicketModel) => {
        let data = {
          month: new Date(ticket.created_at).getMonth(),
          status: ticket.status,
        };
        return data;
      })
);
