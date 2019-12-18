import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions';

@Component({
  selector: 'app-member-list-card',
  templateUrl: './member-list-card.component.html',
  styleUrls: ['./member-list-card.component.css']
})
export class MemberListCardComponent implements OnInit
{

  @Input() organization: OrganizationModel;
  @Input() member: MemberModel;
  @Input() user: UserModel;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  selectMember(member: MemberModel)
  {
    this.router.navigate(['app/organizations/members/profile', member._id]);
  }

  inactiveMember(member: MemberModel)
  {
    this.store.dispatch(MembersActions.inactiveMember({ payload: member }));
  }

  activateMember(member: MemberModel){
    
    this.store.dispatch(MembersActions.updateMember({payload: member}));
  }

}
