import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as CommentsActions from "../../../../../actions/userOrganizations/tickets/ticket/comments/comments.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import Swal from "sweetalert2";
import { CommentsService } from "src/app/services/comments/comments.service";

@Injectable()
export class CommentsEffects {
  constructor(
    private _commentsService: CommentsService,
    private actions$: Actions
  ) {}

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.getComments),
      mergeMap(action =>
        this._commentsService.getComments(action.payload).pipe(
          map((data: any) =>
            CommentsActions.getCommentsSuccess({ payload: data.data })
          ),
          catchError(error =>
            of(CommentsActions.getCommentsFail({ payload: error.error }))
          )
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.addComment),
      mergeMap(action =>
        this._commentsService.addComment(action.payload).pipe(
          map((data: any) => {
            Swal.fire({
              position: "top-end",
              toast: true,
              icon: "success",
              title: "Genial!!",
              text: "Tu comentario se insertó con éxito",
              showConfirmButton: false,
              timer: 2500
            });
            return CommentsActions.addCommentSuccess({ payload: data.data });
          }),
          catchError(error =>
            of(CommentsActions.addCommentFail({ payload: error.error }))
          )
        )
      )
    )
  );
}
