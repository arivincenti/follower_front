import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as OrganizationsActions from '../../../store/actions/userOrganizations/organizations/organizations.actions';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { DialogDataOrganization } from '../../../models/interfaces/dialogDataOrganization';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent implements OnInit, OnDestroy
{
  //UI Observable
  animation$: Observable<string[]>;
  form: FormGroup;

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  userOrganizationsSubscription: Subscription = new Subscription();
  param: string;
  user: UserModel;
  userOrganizations: OrganizationModel[];

  constructor(
    private store: Store<AppState>,
    private _organizationsService: OrganizationsService,
    private dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataOrganization
  ) { }

  ngOnInit()
  {
    console.log(this.data);

    this.animation$ = this.store.select(state => state.ui.animated);

    //User subscription
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    //User organizations subscription
    this.userOrganizationsSubscription = this.store.select(state => state.userOrganizations.organizations.organizations).subscribe(organizations => this.userOrganizations = organizations);

    //FORM
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required, this.avaibleName.bind(this)),
      user: new FormControl(this.user._id)
    });

    //Mark as touched
    this.form.controls['name'].markAsTouched();

    //Check if param is not a new organization
    if (this.data.organization !== 'nueva')
    {
      this._organizationsService.getOrganization(this.data.organization).subscribe((organization: OrganizationModel) => this.form.controls['name'].setValue(organization.name))
    }
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.userOrganizationsSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  // ==================================================
  // Create o Update an organizations depends of params
  // ==================================================
  createOrUpdateOrganization()
  {
    // Validation name before create or update an organization
    if (this.form.invalid) return;

    if (this.data.organization === 'nueva')
    {
      let payload = {
        user: this.user._id,
        name: this.form.controls['name'].value.toUpperCase()
      }

      this.store.dispatch(OrganizationsActions.createOrganization({ payload }));
    } else
    {
      let payload = {
        name: this.form.controls['name'].value.toUpperCase()
      }
      this.store.dispatch(OrganizationsActions.updateOrganization({ organizationId: this.data.organization, payload: payload }));
    }

    this.dialogRef.close();
  }

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleName(control: FormControl): Promise<any> | Observable<any>
  {

    let promise = new Promise((resolve, reject) =>
    {
      let nombre = '';
      this.userOrganizations.forEach(organization =>
      {
        if (organization.name.toUpperCase() === this.form.controls['name'].value.toUpperCase()) nombre = organization.name.toUpperCase();
      });

      if (control.value.toUpperCase() === nombre)
      {
        resolve({ avaible: true });
      } else
      {
        resolve(null)
      }
    });

    return promise;
  }
}
