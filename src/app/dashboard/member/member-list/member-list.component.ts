import { Component, OnInit, Input } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit
{
  @Input() organization: OrganizationModel;
  @Input() user: UserModel;

  members$: Observable<MemberModel[]>;
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.members$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members);
  }

}
