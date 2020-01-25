import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataOrganization } from 'src/app/models/interfaces/dialogDataOrganization';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { AreaModel } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas/areas.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit
{

  form: FormGroup;
  organizations$: Observable<OrganizationModel[]>;
  areas$: Observable<AreaModel[]>;
  priorities: string[] = ['Baja', 'Media', 'Alta'];

  constructor(
    private _areasService: AreasService,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<TicketFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataOrganization
  ) { }

  ngOnInit()
  {

    this.organizations$ = this.store.select(state => state.userOrganizations.organizations.organizations);

    //FORM
    this.form = new FormGroup({
      organization: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      issue: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required)
    });
  }

  selectOrganization(){
    let organization = this.form.controls['organization'].value
    this.areas$ = this._areasService.getAreas(organization);
  }

  createTicket(){
    console.log('se crea el ticket');
  }

}
