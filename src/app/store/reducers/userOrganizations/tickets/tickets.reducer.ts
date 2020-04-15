import { combineReducers } from "@ngrx/store";
import * as TicketsReducer from "./tickets/tickets.reducer";
import * as CommentsReducer from "./comments/comments.reducer";

export interface state {
  tickets: TicketsReducer.TicketsState;
  comments: CommentsReducer.CommentState;
}

export const initialState: state = {
  tickets: TicketsReducer.initialTicketsState,
  comments: CommentsReducer.initialCommentState,
};

export const TicketReducer = combineReducers(
  {
    tickets: TicketsReducer.TicketsReducer,
    comments: CommentsReducer.CommentReducer,
  },
  initialState
);
