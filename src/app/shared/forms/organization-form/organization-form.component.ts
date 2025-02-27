import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import * as OrganizationActions from "../../../store/actions/userOrganizations/organization/organization/organization.actions";
import { Observable, Subject } from "rxjs";
import { OrganizationModel } from "src/app/models/organization.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogDataOrganization } from "../../../models/interfaces/dialogDataOrganization";
import { takeUntil } from "rxjs/operators";
import { organizations } from "src/app/store/selectors/userOrganizations/organizations/organizations.selector";
import { SubSink } from "subsink";

@Component({
  selector: "app-organization-form",
  templateUrl: "./organization-form.component.html",
  styleUrls: ["./organization-form.component.css"],
})
export class OrganizationFormComponent implements OnInit, OnDestroy {
  //UI Observable
  form: FormGroup;

  subs = new SubSink();

  userOrganizations: OrganizationModel[];
  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  organizationLoaded$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataOrganization
  ) {}

  ngOnInit() {
    //User organizations subscription
    this.subs.add(
      this.store
        .select(organizations)
        .subscribe((organizations) => (this.userOrganizations = organizations))
    );

    //FORM
    this.form = new FormGroup({
      name: new FormControl(
        null,
        Validators.required,
        this.avaibleName.bind(this)
      ),
      user: new FormControl(this.data.user._id),
    });

    //Mark as touched
    this.form.controls["name"].markAsTouched();

    //Check if param is not a new organization
    if (this.data.organization) {
      this.form.controls["name"].setValue(this.data.organization.name);
    }
  }

  // ==================================================
  // Create o Update an organizations depends of params
  // ==================================================
  createOrUpdateOrganization() {
    // Validation name before create or update an organization
    if (this.form.invalid) return;

    let name =
      this.form.controls["name"].value.charAt(0).toUpperCase() +
      this.form.controls["name"].value.slice(1);

    if (!this.data.organization) {
      let payload = {
        user: this.data.user,
        name,
      };
      console.log("se creo una nueva");
      this.store.dispatch(OrganizationActions.createOrganization({ payload }));
    } else {
      let payload = {
        name,
        updated_by: this.data.user,
        organization: this.data.organization,
      };
      this.store.dispatch(
        OrganizationActions.updateOrganization({
          organizationId: this.data.organization._id,
          payload: payload,
        })
      );
    }

    this.dialogRef.close();
  }

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleName(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      let nombre = "";
      this.userOrganizations.forEach((organization) => {
        if (
          organization.name.toUpperCase() ===
          this.form.controls["name"].value.toUpperCase()
        )
          nombre = organization.name.toUpperCase();
      });

      if (control.value.toUpperCase() === nombre) {
        resolve({ avaible: true });
      } else {
        resolve(null);
      }
    });

    return promise;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
