import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit
{
  organizations$: Observable<OrganizationModel[]>;
  user$: Observable<UserModel>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.user$ = this.store.select(state => state.auth.user);
    this.organizations$ = this.store.select(state => state.userOrganizations.organizations);
  }

}
