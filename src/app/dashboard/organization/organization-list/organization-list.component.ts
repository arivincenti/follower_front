import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit
{
  organizations$: Observable<OrganizationModel[]>;
  user$: Observable<UserModel>;

  //UI Observables
  loading$: Observable<boolean>;
  error$: Observable<string>;
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {

    this.animation$ = this.store.select(state => state.ui.animated);
    this.user$ = this.store.select(state => state.auth.user);

    this.organizations$ = this.store.select(state => state.userOrganizations.organizations.organizations);

    this.loading$ = this.store.select(state => state.userOrganizations.organizations.loading);
  }

}
