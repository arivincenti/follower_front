import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as OrganizationsActions from '../../../store/actions/organizations/organizations.actions';
import * as OrganizationActions from '../../../store/actions/organizations/organization.actions';
import * as UiActions from '../../../store/actions/ui/ui.actions';
import { OrganizationModel } from 'src/app/models/organization.model';

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.css']
})
export class AreaModalComponent implements OnInit
{

  userSubscription: Subscription = new Subscription();
  userOrganizationSubscription: Subscription = new Subscription();
  userOrganizationAreasSubscription: Subscription = new Subscription();
  user: UserModel;
  organization: OrganizationModel;
  areaName: string = '';
  avaible: boolean = true;
  organizationAreas: AreaModel[];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    this.userOrganizationSubscription = this.store.select(state => state.selectedOrganization.organization.organization).subscribe(organization => this.organization = organization);

    this.userOrganizationAreasSubscription = this.store.select(state => state.selectedOrganization.organizationAreas.organizationAreas.areas).subscribe(areas => this.organizationAreas = areas);

    //Seleccionar las areas de la organization

  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.userOrganizationSubscription.unsubscribe();
  }

  createArea()
  {

    var payload = {
      user: this.user._id,
      organization: this.organization._id,
      name: this.areaName.toUpperCase()
    }

    if (!this.avaible) return;

    console.log(payload);
    this.store.dispatch(OrganizationActions.createOrganizationArea({ payload }));
    this.closeModal();
  }

  validateName()
  {

    this.organizationAreas.forEach(area =>
    {
      if (area.name.toUpperCase() === this.areaName.toUpperCase())
      {
        this.avaible = false;
        return;
      } else
      {
        this.avaible = true;
      }
    });

  }

  closeModal()
  {
    this.store.dispatch(UiActions.clearState());
  }

}
