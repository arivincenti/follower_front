import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as OrganizationsActions from '../../../store/actions/userOrganizations/organizations/organizations.actions';
import * as OrganizationActions from '../../../store/actions/userOrganizations/selectedOrganization/organization.actions';
import { Subscription, Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { DialogDataOrganization } from '../../../models/interfaces/dialogDataOrganization';
import { filter } from 'rxjs/operators';

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

  // paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  userOrganizationsSubscription: Subscription = new Subscription();
  organizationSubscription: Subscription = new Subscription();

  // user: UserModel;
  userOrganizations: OrganizationModel[];
  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  organizationLoaded$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataOrganization
  ) { }

  ngOnInit()
  {

    this.animation$ = this.store.select(state => state.ui.animated);

    //User organizations subscription
    this.userOrganizationsSubscription = this.store.select(state => state.userOrganizations.organizations.organizations).subscribe(organizations => this.userOrganizations = organizations);

    //FORM
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required, this.avaibleName.bind(this)),
      user: new FormControl(this.data.user._id)
    });

    //Mark as touched
    this.form.controls['name'].markAsTouched();

    //Check if param is not a new organization
    if (this.data.organization)
    {
      this.form.controls['name'].setValue(this.data.organization.name);
      // this.organizationLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.loading);

      // this.organizationLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.loaded);

      // this.store.dispatch(OrganizationActions.getOrganization({ organization: this.data.organization, user: this.data.user._id }));

      // this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization);

      // this.organizationSubscription = this.organization$
      //   .pipe(
      //     filter(organization => organization !== null)
      //   )
      //   .subscribe(organization => this.form.controls['name'].setValue(organization.name));

    }
  }

  ngOnDestroy()
  {
    this.userOrganizationsSubscription.unsubscribe();
    this.organizationSubscription.unsubscribe();
  }

  // ==================================================
  // Create o Update an organizations depends of params
  // ==================================================
  createOrUpdateOrganization()
  {
    // Validation name before create or update an organization
    if (this.form.invalid) return;

    if (!this.data.organization)
    {
      let payload = {
        user: this.data.user._id,
        name: this.form.controls['name'].value.toUpperCase()
      }
      console.log('se creo una nueva');
      this.store.dispatch(OrganizationsActions.createOrganization({ payload }));
    } else
    {
      let payload = {
        name: this.form.controls['name'].value.toUpperCase(),
        updated_by: this.data.user._id
      }
      this.store.dispatch(OrganizationsActions.updateOrganization({ organizationId: this.data.organization._id, payload: payload }));
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
