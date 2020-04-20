import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { OrganizationModel } from "src/app/models/organization.model";
import { MemberModel } from "src/app/models/member.model";
import { UserModel } from "src/app/models/user.model";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { TicketsService } from "src/app/services/tickets/tickets.service";
import * as AreaActions from "../../../store/actions/userOrganizations/organization/area/area.actions";
import { SubSink } from "subsink";
import { NotificationsService } from "src/app/services/notifications/notifications.service";

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

  subs = new SubSink();
  // private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private _ticketsService: TicketsService,
    private _notificationService: NotificationsService
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
        this._notificationService.genericNotification(notification);
        return;
      }
    }

    this.subs.add(
      this._ticketsService
        .getMemberResponsibleTickets(member)
        .subscribe((tickets) => {
          if (tickets.length) {
            var notification = {
              type: "error",
              title: "Oops, parece que hay un problema",
              message:
                "No se puede eliminar el miembro porque tiene tickets asignados.",
            };
            this._notificationService.genericNotification(notification);
            return;
          }
          var payload = {
            area,
            member,
            updated_by: this.user,
          };
          this.store.dispatch(AreaActions.deleteAreaMember({ payload }));
        })
    );
  }

  setResponsibleMember(member: MemberModel) {
    let payload = {
      responsible: member,
      updated_by: this.user._id,
      area: this.area,
    };

    this.store.dispatch(AreaActions.setResponsibleAreaMember({ payload }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
