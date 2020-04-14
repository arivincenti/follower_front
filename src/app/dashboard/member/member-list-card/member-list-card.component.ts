import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MemberModel } from "src/app/models/member.model";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as MembersActions from "../../../store/actions/userOrganizations/selectedOrganization/members/members.actions";
import * as AreasActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions";
import { AreaModel } from "src/app/models/area.model";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";
import { GenericNotificationComponent } from "src/app/shared/snackbar/generic-notification/generic-notification.component";

@Component({
  selector: "app-member-list-card",
  templateUrl: "./member-list-card.component.html",
  styleUrls: ["./member-list-card.component.css"],
})
export class MemberListCardComponent implements OnInit, OnDestroy {
  @Input() organization: OrganizationModel;
  @Input() member: MemberModel;
  @Input() user: UserModel;
  @Input() area: AreaModel;

  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private _ticketsService: TicketsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  desactivateMember(member: MemberModel) {
    var payload = {
      member,
      deleted_at: new Date(),
      updated_by: this.user,
    };
    this.store.dispatch(MembersActions.desactivateMember({ payload }));
  }

  activateMember(member: MemberModel) {
    var payload = {
      member,
      deleted_at: undefined,
      updated_by: this.user,
    };
    this.store.dispatch(MembersActions.activateMember({ payload }));
  }

  selectMember(member: MemberModel) {
    console.log(`Se seleccionó a ${member.user.name} ${member.user.last_name}`);
  }

  deleteMember(member: MemberModel, area: AreaModel) {
    if (this.area.responsible) {
      if (member._id === this.area.responsible._id) {
        var notification = {
          type: "error",
          title: "Oops, parece que hay un problema",
          message:
            "No se puede eliminar el miembro porque es el responsable del área",
        };
        this.genericNotification(notification);
        return;
      }
    }
    this._ticketsService
      .getMemberResponsibleTickets(member)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tickets) => {
        if (tickets.length) {
          var notification = {
            type: "error",
            title: "Oops, parece que hay un problema",
            message:
              "No se puede eliminar el miembro porque tiene tickets asignados.",
          };
          this.genericNotification(notification);
          return;
        }
        var payload = {
          area,
          member,
          updated_by: this.user,
        };
        this.store.dispatch(AreasActions.deleteAreaMember({ payload }));
      });
  }

  setResponsibleMember(member: MemberModel) {
    let payload = {
      responsible: member,
      updated_by: this.user._id,
      area: this.area,
    };

    this.store.dispatch(
      AreasActions.updateArea({ areaId: this.area._id, payload: payload })
    );
  }

  genericNotification(notification: any) {
    this._snackBar.openFromComponent(GenericNotificationComponent, {
      duration: 5000,
      data: {
        type: notification.type,
        title: notification.title,
        message: notification.message,
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
