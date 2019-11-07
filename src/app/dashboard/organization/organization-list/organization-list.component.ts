import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit, OnDestroy
{
  userSubscription: Subscription = new Subscription();
  organizationsSubscription: Subscription = new Subscription();

  user: UserModel;
  organizations$: Observable<OrganizationModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe((user: any) => this.user = user);

    this.store.dispatch(OrganizationsActions.getOrganizations({ payload: this.user._id }));
    this.organizations$ = this.store.select(state => state.organizations.organizations);
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.store.dispatch(OrganizationsActions.clearState());
  }

}
