import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TicketModel } from "src/app/models/ticketModel";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as TicketActions from "@actions/ticket";
import * as CommentsActions from "@actions/comments";
import { MemberModel } from "src/app/models/member.model";
import { map, filter } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { CommentModel } from "src/app/models/commentModel";
import { CommentsService } from "src/app/services/comments/comments.service";
import {
  ticket,
  ticketAreaMembers,
  ticketLoading,
} from "src/app/store/selectors/userOrganizations/tickets/ticket/ticket.selector";
import {
  comments,
  commentsLoading,
} from "src/app/store/selectors/userOrganizations/tickets/comments/comments.selector";
import { SubSink } from "subsink";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { user } from "src/app/store/selectors/auth/auth.selector";
import { WebsocketService } from "src/app/services/websocket/websocket.service";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"],
})
export class TicketComponent implements OnInit, OnDestroy {
  subs = new SubSink();

  propertiesForm: FormGroup;
  messageForm: FormGroup;
  messageTypes: any[] = [
    {
      value: "COMENTARIO PÚBLICO",
      checked: true,
      description:
        "El comentario público puede ser leido por cualquier persona que acceda al ticket, aunque no sea miembro del área.",
    },
    {
      value: "NOTA INTERNA",
      checked: false,
      description:
        "La nota interna solo puede ser leida por los miembros del área a la que pertenece el ticket.",
    },
  ];
  minDate: Date = new Date();
  priorities: string[] = ["BAJA", "MEDIA", "ALTA"];
  status: string[] = ["PENDIENTE", "ABIERTO", "CERRADO"];
  members$: Observable<MemberModel[]>;
  param: string;
  user: UserModel;
  owner: boolean = false;
  ticket$: Observable<TicketModel>;
  ticketLoading$: Observable<boolean>;
  comments$: Observable<CommentModel[]>;
  commentsLoading$: Observable<boolean>;
  isFollower: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private commentService: CommentsService,
    private _ticketService: TicketsService,
    private _wsService: WebsocketService
  ) {}

  ngOnInit() {
    //Cargamos las animaciones y obtenemos el ID que viene por la URL
    this.param = this.activatedRoute.snapshot.paramMap.get("id");

    this._wsService.emit("join-ticket", this.param);

    //Despachamos las acciones
    this.store.dispatch(TicketActions.getTicket({ payload: this.param }));
    this.store.dispatch(CommentsActions.getComments({ payload: this.param }));

    //Aca escuchamos cuando alguien crea un nuevo comentario
    this.subs.add(
      this.commentService
        .listenCommentsSocket()
        .subscribe((res: CommentModel) => {
          this.store.dispatch(
            CommentsActions.addCommentSuccess({ payload: res })
          );
        })
    );

    //Seteamos el formulario
    this.messageForm = new FormGroup({
      message: new FormControl(null),
      type: new FormControl(this.messageTypes[0].value),
    });

    this.propertiesForm = new FormGroup({
      status: new FormControl(null),
      members: new FormControl(null),
      priority: new FormControl(null),
      date: new FormControl(null),
    });

    //Buscamos el usuario logueado
    this.subs.add(
      this.store
        .select(user)
        .pipe(filter((user) => user !== null))
        .subscribe((user) => (this.user = user))
    );

    //Obtenemos el estados los los loadings
    this.ticketLoading$ = this.store.select(ticketLoading);

    //Buscamos los datos del ticket
    this.ticket$ = this.store.select(ticket).pipe(
      filter((ticket) => ticket !== null),
      map((ticket) => {
        let follower = ticket.followers.find(
          (follower) => follower._id === this.user._id
        );

        if (follower === undefined) {
          this.isFollower = true;
        } else {
          this.isFollower = false;
        }

        this.propertiesForm.controls["status"].setValue(ticket.status);
        this.propertiesForm.controls["priority"].setValue(ticket.priority);
        this.propertiesForm.controls["date"].setValue(ticket.date);

        if (ticket.responsible)
          this.propertiesForm.controls["members"].setValue(
            ticket.responsible._id
          );

        this.owner = this._ticketService.canEdit(ticket, this.user);

        return ticket;
      })
    );

    this.members$ = this.store.select(ticketAreaMembers);
    this.comments$ = this.store.select(comments);
    this.commentsLoading$ = this.store.select(commentsLoading);
  }

  ngOnDestroy() {
    this._wsService.emit("leave-ticket", this.param);
    //Nos desuscribimos de los observables
    this.subs.unsubscribe();
  }

  // ==================================================
  // Mandamos un nuevo mensaje
  // ==================================================
  sendMessage() {
    let comment = {
      ticket: this.param,
      created_by: this.user,
      ...this.messageForm.value,
    };

    this.store.dispatch(CommentsActions.addComment({ payload: comment }));
    this.messageForm.controls["message"].setValue("");
  }

  // ==================================================
  // Guardamos los cambios de las propiedades del ticket
  // ==================================================
  saveChanges(ticket: any) {
    let responsible = undefined;

    if (this.propertiesForm.controls["members"].value) {
      responsible = this.propertiesForm.controls["members"].value;
    }

    let payload = {
      ticket: ticket,
      area: ticket.area,
      responsible: responsible,
      priority: this.propertiesForm.controls["priority"].value,
      status: this.propertiesForm.controls["status"].value,
      date: this.propertiesForm.controls["date"].value,
      updated_by: this.user._id,
    };

    this.store.dispatch(TicketActions.updateTicket({ payload }));
  }

  follow(ticket: TicketModel, user: UserModel) {
    let payload = {
      user,
      ticket,
    };

    this.store.dispatch(TicketActions.followTicket({ payload }));
  }

  unfollow(ticket: TicketModel, user: UserModel) {
    let payload = {
      user,
      ticket,
    };

    this.store.dispatch(TicketActions.unfollowTicket({ payload }));
  }
}
