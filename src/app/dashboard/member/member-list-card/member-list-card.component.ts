import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

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

  membersLoading$: Observable<boolean>;
  
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.membersLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loading);
   }

  inactiveMember(member: MemberModel)
  {
    this.store.dispatch(MembersActions.inactiveMember({ payload: member }));
  }

  activateMember(member: MemberModel){
    
    this.store.dispatch(MembersActions.updateMember({payload: member}));
  }

}
