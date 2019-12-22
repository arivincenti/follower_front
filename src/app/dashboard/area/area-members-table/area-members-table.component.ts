import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { MemberModel } from 'src/app/models/member.model';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas/areas.actions';
import { AreaModel } from 'src/app/models/area.model';

@Component({
  selector: 'app-area-members-table',
  templateUrl: './area-members-table.component.html',
  styleUrls: ['./area-members-table.component.css']
})
export class AreaMembersTableComponent implements OnInit
{
  @Input() organization: OrganizationModel;
  @Input() members: MemberModel[];
  @Input() user: UserModel;
  @Input() area: AreaModel;

  membersLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.membersLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loading);
  }


  setResponsibleMember(member: MemberModel)
  {
    let payload = {
      responsible: member,
      organization: this.organization._id,
      updated_by: this.user._id
    }
    this.store.dispatch(AreasActions.updateArea({ areaId: this.area._id, payload: payload }));
  }

  displayedColumns: string[] = ['responsable', 'miembro', 'tickets_pendientes', 'tickets_resueltos', 'tickets_despachados', 'tickets_totales'];

}
