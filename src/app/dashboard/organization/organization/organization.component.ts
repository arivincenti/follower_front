import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationActions from '../../../store/actions/userOrganizations/selectedOrganization/organization.actions';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Router } from '@angular/router';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy
{

  userSubscription: Subscription = new Subscription();
  organizations$: Observable<OrganizationModel[]>;
  user: UserModel;

  //UI Observable
  animation$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog    
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
    this.organizations$ = this.store.select(state => state.userOrganizations.organizations.organizations);
    this.store.dispatch(OrganizationActions.clearSelectedOrganizationState());
    // this.store.dispatch(AreasActions.clearSelectedAreaState());
  }

  createOrganization(): void {
    this.dialog.open(OrganizationFormComponent, {
      width: '600px',
      data: {
        organization: 'nueva',
      }
    });
  }

  ngOnDestroy()
  {
    //Nos desuscribimos del store cuando el componente se destruya
    this.userSubscription.unsubscribe();
  }

}
