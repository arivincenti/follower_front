import { createReducer, on, Action, State } from "@ngrx/store";
import * as CommentsActions from "../../../../../actions/userOrganizations/tickets/ticket/comments/comments.actions";
import { CommentModel } from "src/app/models/commentModel";

export interface CommentState
{
  comments: CommentModel[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialCommentState: CommentState = {
  comments: [],
  loading: false,
  loaded: false,
  error: null
};

export const commentReducer = createReducer(
  initialCommentState,
  on( CommentsActions.getComments, state => ( {
    ...state,
    comments: [],
    loading: true,
    loaded: false,
    error: null
  } ) ),
  on( CommentsActions.getCommentsSuccess, ( state, { payload } ) => ( {
    ...state,
    comments: [ ...payload ],
    loading: false,
    loaded: true
  } ) ),
  on( CommentsActions.getCommentsFail, ( state, { payload } ) => ( {
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  } ) ),
  on( CommentsActions.addComment, state => ( {
    ...state,
    comments: [ ...state.comments ],
    loading: true,
    loaded: false,
    error: null
  } ) ),
  on( CommentsActions.addCommentSuccess, ( state, { payload } ) => ( {
    ...state,
    comments: [ { ...payload }, ...state.comments ],
    loading: false,
    loaded: true
  } ) ),
  on( CommentsActions.addCommentFail, ( state, { payload } ) => ( {
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  } ) )
);

export function CommentReducer (
  state: CommentState | undefined,
  action: Action
)
{
  return commentReducer( state, action );
}
