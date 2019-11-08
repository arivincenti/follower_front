import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { UsersService } from 'src/app/services/users/users.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';

@Component({
  selector: 'app-organization-user-areas-list',
  templateUrl: './organization-user-areas-list.component.html',
  styleUrls: ['./organization-user-areas-list.component.css']
})
export class OrganizationUserAreasListComponent implements OnInit
{

  @Input() user: UserModel;
  @Input() organization: OrganizationModel;
  memberAreas$: Observable<MemberModel[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.store.dispatch(OrganizationsActions.getOrganizationUserAreaMember({user: this.user._id, organization: this.organization._id}))

    this.memberAreas$ = this.store.select(state => state.organizations.organization.organizationUserAreasMember.areasMember);
  }

}
