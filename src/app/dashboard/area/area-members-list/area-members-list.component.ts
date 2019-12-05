import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-area-members-list',
  templateUrl: './area-members-list.component.html',
  styleUrls: ['./area-members-list.component.css']
})
export class AreaMembersListComponent implements OnInit
{

  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    // this.members$ = this.store.select(state => state.userOrganizations.selectedArea.areaMembers.members);
    // this.membersLoading$ = this.store.select(state => state.selectedArea.areaMembers.loading);
  }

}
