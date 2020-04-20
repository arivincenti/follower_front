import { Component, OnInit, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AreaModel } from "src/app/models/area.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as AreaActions from "../../../store/actions/userOrganizations/organization/area/area.actions";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogDataArea } from "src/app/models/interfaces/dialogDataArea";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { areas } from "src/app/store/selectors/userOrganizations/organization/areas/areas.selector";
import { SubSink } from "subsink";

@Component({
  selector: "app-area-form",
  templateUrl: "./area-form.component.html",
  styleUrls: ["./area-form.component.css"],
})
export class AreaFormComponent implements OnInit {
  form: FormGroup;

  subs = new SubSink();

  avaible: boolean = true;
  areas: AreaModel[];
  area$: Observable<AreaModel>;
  areaLoading$: Observable<boolean>;
  areaLoaded$: Observable<boolean>;

  area: AreaModel;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataArea
  ) {}

  ngOnInit() {
    //Search organizations areas
    this.subs.add(
      this.store.select(areas).subscribe((areas) => (this.areas = areas))
    );

    //FORM
    this.form = new FormGroup({
      area: new FormControl(
        null,
        Validators.required,
        this.avaibleName.bind(this)
      ),
    });

    //Mark as touched
    this.form.controls["area"].markAsTouched();

    //Check if param is not a new area, then search it
    if (this.data.area) {
      this.form.controls["area"].setValue(this.data.area.name);
    }
  }

  // ==================================================
  // Create a new Area or Update one
  // ==================================================
  createOrUpdateArea() {
    // Validation name before create or update an organization
    if (this.form.invalid) return;

    if (!this.data.area) {
      let payload = {
        user: this.data.user._id,
        organization: this.data.organization._id,
        name: this.form.controls["area"].value.toUpperCase(),
      };

      this.store.dispatch(AreaActions.createArea({ payload }));
    } else {
      let payload = {
        name: this.form.controls["area"].value.toUpperCase(),
        organization: this.data.organization._id,
        updated_by: this.data.user._id,
        area: this.data.area,
      };

      this.store.dispatch(
        AreaActions.updateArea({
          areaId: this.data.area._id,
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
      this.areas.forEach((area) => {
        if (
          area.name.toUpperCase() ===
          this.form.controls["area"].value.toUpperCase()
        )
          nombre = area.name.toUpperCase();
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
