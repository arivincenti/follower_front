import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UiActions from '../../../store/actions/ui/ui.actions';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy
{

  userSubscription: Subscription = new Subscription();
  organizationsSubscription: Subscription = new Subscription();

  user: UserModel;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe((user: any) => this.user = user);

    this.store.dispatch(OrganizationsActions.getOrganizations({ payload: this.user._id }));
  }

  createOrganization()
  {
    this.store.dispatch(UiActions.showOrganizationModal());
    // this.router.navigate(['app/organizations/create']);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
