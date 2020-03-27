import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TicketModel } from "src/app/models/ticketModel";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as TicketActions from "../../../store/actions/userOrganizations/tickets/ticket/ticket/ticket.actions";
import * as CommentsActions from "../../../store/actions/userOrganizations/tickets/ticket/comments/comments.actions";
import { MemberModel } from "src/app/models/member.model";
import { map, filter, takeUntil } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";
import { CommentModel } from "src/app/models/commentModel";
import { CommentsService } from "src/app/services/comments/comments.service";
import { WebsocketService } from "src/app/services/websocket/websocket.service";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"]
})
export class TicketComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();
  propertiesForm: FormGroup;
  messageForm: FormGroup;
  messageTypes: any[] = [
    {
      value: "COMENTARIO PÚBLICO",
      checked: true,
      description:
        "El comentario público puede ser leido por cualquier persona que acceda al ticket, aunque no sea miembro del área."
    },
    {
      value: "NOTA INTERNA",
      checked: false,
      description:
        "La nota interna solo puede ser leida por los miembros del área a la que pertenece el ticket."
    }
  ];
  minDate: Date = new Date();
  priorities: string[] = ["BAJA", "MEDIA", "ALTA"];
  status: string[] = ["PENDIENTE", "ABIERTO", "CERRADO"];
  members: MemberModel[];
  param: string;
  user: UserModel;
  owner: boolean = true;
  ticket$: Observable<TicketModel>;
  ticketLoading$: Observable<boolean>;
  comments$: Observable<CommentModel[]>;
  commentsLoading$: Observable<boolean>;

  //UI Observable
  animation$: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private commentService: CommentsService,
    private wsService: WebsocketService
  ) {}

  ngOnInit() {
    //Cargamos las animaciones y obtenemos el ID que viene por la URL
    this.animation$ = this.store.select(state => state.ui.animated);
    this.param = this.activatedRoute.snapshot.paramMap.get("id");

    //Aca escuchamos cuando alguien crea un nuevo comentario
    this.commentService
      .listenCommentsSocket()
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe((res: CommentModel) => {
        this.store.dispatch(
          CommentsActions.addCommentSuccess({ payload: res })
        );
      });

    //Despachamos las acciones
    this.store.dispatch(TicketActions.getTicket({ payload: this.param }));
    this.store.dispatch(CommentsActions.getComments({ payload: this.param }));

    //Seteamos el formulario
    this.messageForm = new FormGroup({
      message: new FormControl(null),
      type: new FormControl(this.messageTypes[0].value)
    });

    //Buscamos el usuario logueado
    this.store
      .select(state => state.auth.user)
      .pipe(
        takeUntil(this.unsuscribe$),
        filter(user => user !== null)
      )
      .subscribe(user => (this.user = user));

    //Obtenemos el estados los los loadings
    this.ticketLoading$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.ticket.loading
    );

    //Buscamos los datos del ticket
    this.ticket$ = this.store
      .select(
        state => state.userOrganizations.tickets.selectedTicket.ticket.ticket
      )
      .pipe(
        filter(ticket => ticket !== null),
        map((ticket: TicketModel) => {
          this.members = ticket.area.members;

          this.propertiesForm = new FormGroup({
            status: new FormControl(ticket.status),
            members: new FormControl(null),
            priority: new FormControl(ticket.priority),
            date: new FormControl(ticket.date)
          });

          if (ticket.responsible)
            this.propertiesForm.controls["members"].setValue(
              ticket.responsible._id
            );

          if (
            // Si soy el creador del ticket y pertenezco al area puedo editar
            ticket.area.members.find(
              member => member.user._id === this.user._id
            ) &&
            ticket.created_by._id === this.user._id
          ) {
            this.owner = false;
            console.log("entro al primero");
          } else if (
            // Si soy el creador del ticket y NO pertenezco al area NO puedo editar
            !ticket.area.members.find(
              member => member.user._id === this.user._id
            ) &&
            ticket.created_by._id === this.user._id
          ) {
            this.owner = true;
            console.log("entro al segundo");
          } else if (
            // Si NO soy el creador del ticket pero pertenezco al area puedo editar
            ticket.area.members.find(
              member => member.user._id === this.user._id
            ) &&
            ticket.created_by._id !== this.user._id
          ) {
            this.owner = false;
          }

          return ticket;
        })
      );

    //Obtenemos los comentarios
    this.comments$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.comments.comments
    );
    this.commentsLoading$ = this.store.select(
      state => state.userOrganizations.tickets.selectedTicket.comments.loading
    );
  }

  ngOnDestroy() {
    //Nos desuscribimos de los observables
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  // ==================================================
  // Mandamos un nuevo mensaje
  // ==================================================
  sendMessage() {
    let comment = {
      ticket: this.param,
      created_by: this.user,
      ...this.messageForm.value
    };

    this.store.dispatch(CommentsActions.addComment({ payload: comment }));
    this.messageForm.controls["message"].setValue("");
  }

  // ==================================================
  // Guardamos los cambios de las propiedades del ticket
  // ==================================================
  saveChanges(ticket: any) {
    let payload = {
      ticket: ticket._id,
      area: ticket.area._id,
      responsible: this.propertiesForm.controls["members"].value,
      priority: this.propertiesForm.controls["priority"].value,
      status: this.propertiesForm.controls["status"].value,
      date: this.propertiesForm.controls["date"].value,
      created_by: this.user._id
    };

    this.store.dispatch(TicketActions.updateTicket({ payload }));
  }
}
