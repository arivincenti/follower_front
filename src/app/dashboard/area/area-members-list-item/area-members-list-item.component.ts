import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions';

@Component({
  selector: 'tr[app-area-members-list-item]',
  templateUrl: './area-members-list-item.component.html',
  styleUrls: ['./area-members-list-item.component.css']
})
export class AreaMembersListItemComponent implements OnInit {

  @Input() member: MemberModel;
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  updateMember(member: MemberModel){

    // this.store.dispatch(AreasActions.updateAreaMember({payload: member}));
  }

  deleteMember(member: MemberModel){
    // this.store.dispatch(AreasActions.deleteAreaMember({payload: member}));
  }

  reactiveMember(member: MemberModel){
    member.deleted_at = new Date();
    // this.store.dispatch(AreasActions.updateAreaMember({payload: member}));
  }


}
