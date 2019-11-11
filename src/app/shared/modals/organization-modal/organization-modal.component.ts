import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationActions from '../../../store/actions/organization/organization.actions';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';
import * as UiActions from '../../../store/actions/ui/ui.actions';
import { OrganizationModel } from 'src/app/models/organization.model';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.css']
})
export class OrganizationModalComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription();
  userOrganizationsSubscription: Subscription = new Subscription();
  form: FormGroup;
  user: UserModel;
  organization: string;
  disponible: boolean = true;
  userOrganizations: OrganizationModel[];
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    this.userOrganizationsSubscription = this.store.select(state => state.userOrganizations.organizations.organizations).subscribe(organizations => this.userOrganizations = organizations);

    let user = this.user.name + ' '+ this.user.last_name;

    this.form = new FormGroup({
      user: new FormControl(this.user._id, Validators.required),
      user_name: new FormControl(user, Validators.required),
      name: new FormControl(null, Validators.required),
    })
  }

  ngOnDestroy(){
    console.log('modal destruido');
    this.userSubscription.unsubscribe();
    this.userOrganizationsSubscription.unsubscribe();
  }

  createOrganization()
  {
    var user: string = this.form.value.user;
    var organization: string = this.form.value.name;

    var payload = {
      user: user,
      name: organization.toUpperCase()
    }

    this.store.dispatch(OrganizationsActions.createOrganization({ payload }));
    this.closeModal();
  }

  validateName()
  {
    var organizationName: string = this.form.value.name;
    this.disponible = true;
    this.userOrganizations.forEach(organization =>
    {
      if (organization.name === organizationName.toUpperCase())
      {
        this.disponible = false;
        return
      }
    });
  }

  closeModal(){
    this.store.dispatch(UiActions.clearState());
  }

}
