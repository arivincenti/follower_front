import { AppState } from "src/app/store/app.reducer";
import { createSelector } from "@ngrx/store";

const selectedTicketState = (state: AppState) =>
  state.userOrganizations.tickets.selectedTicket.comments;

export const commentsLoading = createSelector(
  selectedTicketState,
  (selectedTicketState) => selectedTicketState.loading
);

export const comments = createSelector(
  selectedTicketState,
  (selectedTicketState) => selectedTicketState.comments
);
