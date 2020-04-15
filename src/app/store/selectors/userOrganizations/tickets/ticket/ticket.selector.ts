import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";
import { TicketModel } from "src/app/models/ticketModel";
import { MemberModel } from "src/app/models/member.model";

const tickets = (state: AppState) => state.userOrganizations.tickets.tickets;

export const ticket = createSelector(tickets, (tickets, ticket_id: string) => {
  return tickets.tickets.find(
    (ticket: TicketModel) => ticket._id === ticket_id
  );
});

export const ticketAreaMembers = createSelector(
  tickets,
  (tickets, ticket_id: string) => {
    let ticket = tickets.tickets.find(
      (ticket: TicketModel) => ticket._id === ticket_id
    );
    return ticket.area.members.filter((member: MemberModel) => member !== null);
  }
);

export const ticketLoading = createSelector(
  tickets,
  (tickets) => tickets.loading
);
