import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MemberModel } from "src/app/models/member.model";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as MembersActions from "../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions";
import * as AreasActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { AreaModel } from "src/app/models/area.model";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { deleteAreaMember } from "src/app/store/actions/userOrganizations/selectedOrganization/areas/area/area.actions";
import { MatSnackBar } from "@angular/material";
import { GenericNotificationComponent } from "src/app/shared/snackbar/generic-notification/generic-notification.component";
import { NotificationsService } from "src/app/services/notifications/notifications.service";

@Component({
  selector: "app-member-list-card",
  templateUrl: "./member-list-card.component.html",
  styleUrls: ["./member-list-card.component.css"]
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
    private _notificationService: NotificationsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  inactiveMember(member: MemberModel) {
    this.store.dispatch(MembersActions.inactiveMember({ payload: member }));
  }

  activateMember(member: MemberModel) {
    this.store.dispatch(MembersActions.updateMember({ payload: member }));
  }

  selectMember(member: MemberModel) {
    console.log(`Se seleccionó a ${member.user.name} ${member.user.last_name}`);
  }

  deleteMember(member: MemberModel, area: AreaModel) {
    if (member._id === this.area.responsible._id) {
      var notification = {
        type: "error",
        title: "Oops, parece que hay un problema",
        message:
          "No se puede eliminar el miembro porque es el responsable del área"
      };
      this.genericNotification(notification);
      return;
    }
    this._ticketsService
      .getMemberResponsibleTickets(member)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tickets => {
        if (tickets.length) {
          var notification = {
            type: "error",
            title: "Oops, parece que hay un problema",
            message:
              "No se puede eliminar el miembro porque tiene tickets asignados."
          };
          this.genericNotification(notification);
          return;
        }
        var payload = {
          area,
          member
        };
        this.store.dispatch(deleteAreaMember({ payload }));
      });
  }

  setResponsibleMember(member: MemberModel) {
    let payload = {
      responsible: member,
      updated_by: this.user._id
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
        message: notification.message
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
