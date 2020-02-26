import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TicketModel } from "src/app/models/ticketModel";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as TicketActions from "../../../store/actions/userOrganizations/tickets/ticket/ticket/ticket.actions";
import * as CommentsActions from "../../../store/actions/userOrganizations/tickets/ticket/comments/comments.actions";
import { MemberModel } from "src/app/models/member.model";
import { AreasService } from "src/app/services/areas/areas.service";
import { map, filter } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { CommentModel } from "src/app/models/commentModel";
import { CommentsService } from "src/app/services/comments/comments.service";
import { WebsocketService } from "src/app/services/websocket/websocket.service";

@Component( {
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: [ "./ticket.component.css" ]
} )
export class TicketComponent implements OnInit, OnDestroy
{
  userSubscription: Subscription = new Subscription();
  wsCommentSubscription: Subscription = new Subscription();
  messageForm: FormGroup;
  messageTypes: any[] = [
    { value: "PÚBLICO", checked: true },
    { value: "NOTA", checked: false }
  ];
  priorities: string[] = [ "BAJA", "MEDIA", "ALTA" ];
  formControlMembers: FormControl;
  formControlPrority: FormControl;
  membersLoading: boolean = false;
  members$: Observable<MemberModel>;
  param: string;
  user: UserModel;
  ticket$: Observable<TicketModel>;
  ticket: TicketModel;
  ticketLoading$: Observable<boolean>;
  ticketLoaded$: Observable<boolean>;
  comments$: Observable<CommentModel[]>;
  commentsLoading$: Observable<boolean>;
  commentsLoaded$: Observable<boolean>;

  //UI Observable
  animation$: Observable<string[]>;

  constructor (
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private _areasService: AreasService,
    private commentService: CommentsService,
    private wsService: WebsocketService
  ) { }

  ngOnInit ()
  {
    this.param = this.activatedRoute.snapshot.paramMap.get( "id" );

    //Cuando entramos al ticket nos unimos como si fuese una sala de chat
    this.wsService.emit( "join-ticket", this.param );

    //Aca escuchamos cuando alguien crea un nuevo comentario
    this.wsCommentSubscription = this.commentService
      .listenCommentsSocket()
      .subscribe( msg =>
      {
        this.store.dispatch(
          CommentsActions.getComments( { payload: this.param } )
        );
      } );

    this.animation$ = this.store.select( state => state.ui.animated );

    this.userSubscription = this.store
      .select( state => state.auth.user )
      .pipe( filter( user => user !== null ) )
      .subscribe( user => ( this.user = user ) );

    this.messageForm = new FormGroup( {
      message: new FormControl( null ),
      type: new FormControl( this.messageTypes[ 0 ].value ),
      status: new FormControl()
    } );

    this.store.dispatch( TicketActions.getTicket( { payload: this.param } ) );
    this.store.dispatch( CommentsActions.getComments( { payload: this.param } ) );

    this.ticketLoading$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.ticket.loading
    );

    this.ticketLoaded$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.ticket.loaded
    );

    this.ticket$ = this.store
      .select(
        state => state.userOrganizations.tickets.selectedTicket.ticket.ticket
      )
      .pipe(
        filter( ticket => ticket !== null ),
        map( ticket =>
        {
          this.membersLoading = true;
          this.members$ = this._areasService
            .getAreaMembers( ticket.area._id )
            .pipe(
              map( members =>
              {
                this.membersLoading = false;
                return members;
              } )
            );

          if ( ticket.responsible )
          {
            this.formControlMembers = new FormControl( ticket.responsible._id );
          } else
          {
            this.formControlMembers = new FormControl( null );
          }
          this.formControlPrority = new FormControl( ticket.priority );
          return ticket;
        } )
      );

    this.comments$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.comments.comments
    );
  }

  ngOnDestroy ()
  {
    // Nos salimos del ticket (sala)
    this.wsService.emit( "leave-ticket", this.param );

    this.userSubscription.unsubscribe();
    this.wsCommentSubscription.unsubscribe();
  }

  sendMessage ()
  {
    let comment = {
      ticket: this.param,
      created_by: this.user,
      ...this.messageForm.value
    };

    this.store.dispatch( CommentsActions.addComment( { payload: comment } ) );
    this.messageForm.controls[ "message" ].setValue( "" );

  }

  saveChanges ( ticket: any )
  {
    let payload = {
      ticket: ticket._id,
      area: ticket.area._id,
      responsible: this.formControlMembers.value,
      priority: this.formControlPrority.value,
      created_by: this.user._id
    };

    this.store.dispatch( TicketActions.updateTicket( { payload } ) );
  }
}
