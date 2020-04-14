import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { MemberModel } from "src/app/models/member.model";
import { UserModel } from "src/app/models/user.model";
import { AreaModel } from "src/app/models/area.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import { MatSnackBar } from "@angular/material";
import { takeUntil } from "rxjs/operators";
import { GenericNotificationComponent } from "src/app/shared/snackbar/generic-notification/generic-notification.component";
import * as AreasActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions";

@Component({
  selector: "app-area-members-list-card",
  templateUrl: "./area-members-list-card.component.html",
  styleUrls: ["./area-members-list-card.component.css"],
})
export class AreaMembersListCardComponent implements OnInit, OnDestroy {
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
