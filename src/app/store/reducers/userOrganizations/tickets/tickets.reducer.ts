import { combineReducers } from "@ngrx/store";
import * as TicketReducer from "./ticket/ticket.reducer";
import * as TicketsReducer from "./tickets/tickets.reducer";
import * as CommentsReducer from "./comments/comments.reducer";

export interface state {
  ticket: TicketReducer.TicketState;
  tickets: TicketsReducer.TicketsState;
  comments: CommentsReducer.CommentState;
}

export const initialState: state = {
  ticket: TicketReducer.initialStateTicket,
  tickets: TicketsReducer.initialTicketsState,
  comments: CommentsReducer.initialCommentState,
};

export const IndexTicketsReducer = combineReducers(
  {
    ticket: TicketReducer.TicketReducer,
    tickets: TicketsReducer.TicketsReducer,
    comments: CommentsReducer.CommentReducer,
  },
  initialState
);
