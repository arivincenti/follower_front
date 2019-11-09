import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationModel } from 'src/app/models/organization.model';
import * as OrganizationActions from '../../../store/actions/organization/organization.actions';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit, OnDestroy
{
  userSubscription: Subscription = new Subscription();
  form: FormGroup;
  user: UserModel;
  organization: string = '';
  disponible: boolean = true;
  userOrganizations: OrganizationModel[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    this.store.select(state => state.userOrganizations.organizations).subscribe(organizations =>
    {
      this.userOrganizations = organizations;
    })

    let user = this.user.name + ' '+ this.user.last_name;

    this.form = new FormGroup({
      user: new FormControl(this.user._id, Validators.required),
      user_name: new FormControl(user, Validators.required),
      name: new FormControl(null, Validators.required),
    })
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  createOrganization()
  {

    var user: string = this.form.value.user;
    var organization: string = this.form.value.name;

    var payload = {
      user: user,
      name: organization.toUpperCase()
    }

    this.store.dispatch(OrganizationActions.createOrganization({ payload }));
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

}
