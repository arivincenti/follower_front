import { createAction, props } from "@ngrx/store";
import { CommentModel } from "src/app/models/commentModel";

export const getComments = createAction(
  "[Comments Actions] Get comments",
  props<{ payload: any }>()
);

export const getCommentsSuccess = createAction(
  "[Comments Actions] Get comments Success",
  props<{ payload: CommentModel[] }>()
);

export const getCommentsFail = createAction(
  "[Comments Actions] Get comments Fail",
  props<{ payload: any }>()
);

export const addComment = createAction(
  "[Comments Actions] Add comment",
  props<{ payload: any }>()
);

export const addCommentSuccess = createAction(
  "[Comments Actions] Add comment Success",
  props<{ payload: CommentModel }>()
);

export const addCommentFail = createAction(
  "[Comments Actions] Add comment Fail",
  props<{ payload: any }>()
);
