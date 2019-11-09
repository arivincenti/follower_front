import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationUserAreasActions from '../../../store/actions/organization/organizationUserAreas.actions';
import { AreaModel } from 'src/app/models/area.model';

@Component({
  selector: 'app-organization-user-areas-list',
  templateUrl: './organization-user-areas-list.component.html',
  styleUrls: ['./organization-user-areas-list.component.css']
})
export class OrganizationUserAreasListComponent implements OnInit, OnDestroy
{

  @Input() user: UserModel;
  @Input() organization: OrganizationModel;
  userAreas$: Observable<AreaModel[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.store.dispatch(OrganizationUserAreasActions.getOrganizationUserAreas({user: this.user._id, organization: this.organization._id}))

    this.userAreas$ = this.store.select(state => state.organizationUserAreas.areas);
  }

  ngOnDestroy()
  {
    this.store.dispatch(OrganizationUserAreasActions.clearState());
  }

}
