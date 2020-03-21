import { Component, OnInit, Input } from "@angular/core";
import { MemberModel } from "src/app/models/member.model";
import { OrganizationModel } from "src/app/models/organization.model";
import { UserModel } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as MembersActions from "../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions";
import * as AreasActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions";
import { AreaModel } from "src/app/models/area.model";

@Component({
  selector: "app-member-list-card",
  templateUrl: "./member-list-card.component.html",
  styleUrls: ["./member-list-card.component.css"]
})
export class MemberListCardComponent implements OnInit {
  @Input() organization: OrganizationModel;
  @Input() member: MemberModel;
  @Input() user: UserModel;
  @Input() area: AreaModel;

  constructor(private store: Store<AppState>) {}

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

  deleteMember(member: MemberModel) {
    if (member._id === this.area.responsible._id) {
      console.log("El miembro no se puede eliiminar porq es el responsable");
      return;
    }
    console.log(
      `Se quitó del área a ${member.user.name} ${member.user.last_name}`
    );
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
}
