import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {

  }

  createOrganization()
  {
    //Activamos el modal de carga de una nueva organizacion mediante un efecto
    this.store.dispatch(UiActions.showOrganizationModal());
  }

  ngOnDestroy(){
    //Nos desuscribimos del store cuando el componente se destruya
    this.userSubscription.unsubscribe();
  }

}
