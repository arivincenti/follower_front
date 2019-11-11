import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { MemberModel } from 'src/app/models/member.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';
import * as OrganizationActions from '../../../store/actions/organization/organization.actions';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  organization$: Observable<OrganizationModel>;
  userAreas$: Observable<AreaModel[]>
  user: UserModel;
  areas$: Observable<AreaModel[]>;


  constructor(
    private store: Store<AppState>,
    private actiavtedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => {
      this.user = user;
    });

    let organization_id;

    this.paramSubscription = this.actiavtedRoute.params.subscribe(param =>
    {
      organization_id = param.id
    });

    this.store.dispatch(OrganizationsActions.getOrganization({ organization: organization_id, user: this.user._id }));
    
    this.organization$ = this.store.select(state => state.userOrganizations.organizationSelected.organization.organization);

  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.store.dispatch(OrganizationsActions.clearSelectedOrganizationState());
  }

  deleteOrganization(organization: OrganizationModel){
    this.store.dispatch(OrganizationActions.deleteOrganization({organization: organization._id}));
  }

}
