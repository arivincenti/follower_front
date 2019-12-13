import { Component, OnInit, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AreasActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/areas.actions';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataArea } from 'src/app/models/interfaces/dialogDataArea';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit
{
  form: FormGroup;

  userSubscription: Subscription = new Subscription();
  userOrganizationSubscription: Subscription = new Subscription();
  organizationAreasSubscription: Subscription = new Subscription();
  user: UserModel;
  organization: OrganizationModel;
  avaible: boolean = true;
  organizationAreas: AreaModel[];
  area: AreaModel;

  constructor(
    private store: Store<AppState>,
    private _areasService: AreasService,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataArea
  ) { }

  ngOnInit()
  {
    //User Subscription    
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    //User selected organization subscription
    this.userOrganizationSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization).subscribe(organization => this.organization = organization);

    //Search organizations areas
    this.organizationAreasSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas).subscribe(areas => this.organizationAreas = areas);


    //FORM
    this.form = new FormGroup({
      area: new FormControl(null, Validators.required, this.avaibleName.bind(this)),
    });

    //Mark as touched
    this.form.controls['area'].markAsTouched();

    //Check if param is not a new area, then search it
    if (this.data.area !== 'nueva')
    {
      this._areasService.getSelectedArea(this.data.area).subscribe((area: AreaModel) =>
      {
        this.form.controls['area'].setValue(area.name);
        this.area = area;
      })
    }
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.userOrganizationSubscription.unsubscribe();
    this.organizationAreasSubscription.unsubscribe();
  }

  // ==================================================
  // Create a new Area or Update one
  // ==================================================
  createOrUpdateArea()
  {
    // Validation name before create or update an organization
    if (this.form.invalid) return;

    if (this.data.area === 'nueva')
    {
      let payload = {
        user: this.user._id,
        organization: this.organization._id,
        name: this.form.controls['area'].value.toUpperCase()
      }
      this.store.dispatch(AreasActions.createArea({ payload }));
    } else
    {
      let payload = {
        name: this.form.controls['area'].value.toUpperCase()
      }
      this.store.dispatch(AreasActions.updateArea({ areaId: this.area._id, payload: payload }));
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
      this.organizationAreas.forEach(area =>
      {
        if (area.name.toUpperCase() === this.form.controls['area'].value.toUpperCase()) nombre = area.name.toUpperCase();
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
