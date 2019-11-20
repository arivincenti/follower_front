import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';
import * as OrganizationsActions from '../store/actions/organizations/organizations.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{

  organizationModal$: Observable<boolean>;
  areaModal$: Observable<boolean>;
  userSubscription: Subscription = new Subscription();
  organizationsSubscription: Subscription = new Subscription();
  user: UserModel;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    //Obtenemos el usuario del store, mediante una subscripcion
    this.userSubscription = this.store.select(state => state.auth.user).subscribe((user: any) => this.user = user);

    //Cargamos las organizaciones del usuario y quedamos pendientes de modificaciones
    this.store.dispatch(OrganizationsActions.getUserOrganizations({ payload: this.user._id }));

    this.areaModal$ = this.store.select(state => state.ui.areaModal);
  }

}
