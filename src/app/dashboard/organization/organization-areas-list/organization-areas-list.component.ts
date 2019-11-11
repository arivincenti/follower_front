import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable, Subscription } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationAreasActions from '../../../store/actions/organization/organizationAreas.actions';
import { UserModel } from 'src/app/models/user.model';
import { MemberModel } from 'src/app/models/member.model';

@Component({
  selector: 'app-organization-areas-list',
  templateUrl: './organization-areas-list.component.html',
  styleUrls: ['./organization-areas-list.component.css']
})
export class OrganizationAreasListComponent implements OnInit, OnDestroy
{

  @Input() organization: OrganizationModel;
  @Input() user: UserModel;
  loadingSubscription: Subscription = new Subscription();
  areas$: Observable<AreaModel[]>;
  loading: boolean;
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.areas$ = this.store.select(state => state.userOrganizations.organizationSelected.organizationAreas.organizationAreas);
  }

  ngOnDestroy()
  {
    this.store.dispatch(OrganizationAreasActions.clearState());
  }

}
