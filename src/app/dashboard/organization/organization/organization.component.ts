import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as UiActions from '../../../store/actions/ui/ui.actions';
import { OrganizationModel } from 'src/app/models/organization.model';


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
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);
    this.organizations$ = this.store.select(state => state.userOrganizations.organizations);
  }

  createOrganization()
  {
    //Activamos el modal de carga de una nueva organizacion mediante un efecto
    this.store.dispatch(UiActions.showOrganizationModal());
  }

  ngOnDestroy()
  {
    //Nos desuscribimos del store cuando el componente se destruya
    this.userSubscription.unsubscribe();
  }

}
