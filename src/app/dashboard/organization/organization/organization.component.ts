import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';
import * as AreasActions from '../../../store/actions/areas/areas.actions';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Router } from '@angular/router';


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
    private router: Router
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
    this.organizations$ = this.store.select(state => state.userOrganizations.organizations);
    this.store.dispatch(OrganizationActions.clearSelectedOrganizationState());
    this.store.dispatch(AreasActions.clearSelectedAreaState());
  }

  createOrganization()
  {
    //Activamos el modal de carga de una nueva organizacion mediante un efecto
    this.router.navigate(['app/organizations/form', 'nueva']);
  }

  ngOnDestroy()
  {
    //Nos desuscribimos del store cuando el componente se destruya
    this.userSubscription.unsubscribe();
  }

}
