import { combineReducers } from "@ngrx/store";
import * as TicketReducer from "./ticket/ticket.reducer";
import * as CommentsReducer from "./comments/comments.reducer";

export interface state {
  ticket: TicketReducer.TicketState;
  comments: CommentsReducer.CommentState;
}

export const initialState: state = {
  ticket: TicketReducer.initialTicketState,
  comments: CommentsReducer.initialCommentState
};

export const SelectedTicketReducer = combineReducers(
  {
    ticket: TicketReducer.TicketReducer,
    comments: CommentsReducer.CommentReducer
  },
  initialState
);
