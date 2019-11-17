import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy
{

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  organization$: Observable<OrganizationModel>;
  userAreas$: Observable<AreaModel[]>
  user: UserModel;
  areas$: Observable<AreaModel[]>;
  animation$: Observable<string[]>;


  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user =>
    {
      this.user = user;
    });

    let organization_id: string;

    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      organization_id = param.id
    });

    this.store.dispatch(OrganizationActions.getOrganization({ organization: organization_id, user: this.user._id }));

    this.organization$ = this.store.select(state => state.selectedOrganization.organization.organization);

  }

  ngOnDestroy()
  {
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    // this.store.dispatch(OrganizationsActions.clearSelectedOrganizationState());
  }

}
