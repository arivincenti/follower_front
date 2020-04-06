import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MemberModel } from "src/app/models/member.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MemberFormComponent } from "../member-form/member-form.component";
import { DialogDataArea } from "src/app/models/interfaces/dialogDataArea";
import { takeUntil, map } from "rxjs/operators";
import { createAreaMember } from "src/app/store/actions/userOrganizations/selectedOrganization/areas/area/area.actions";

@Component({
  selector: "app-area-member-form",
  templateUrl: "./area-member-form.component.html",
  styleUrls: ["./area-member-form.component.css"]
})
export class AreaMemberFormComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();

  form: FormGroup;
  organizationMembers$: Observable<MemberModel[]>;
  organizationMembers: MemberModel[];
  areaMembers: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataArea
  ) {
    this.organizationMembers$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.members.members.members
      )
      .pipe(map(members => (this.organizationMembers = members)));

    this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.areas.selectedArea.area
      )
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(area => (this.areaMembers = area.members));
  }

  ngOnInit() {
    this.setForm();
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe();
  }

  displayFn(subject) {
    return subject ? subject.user.email : undefined;
  }

  setForm() {
    this.form = new FormGroup({
      email: new FormControl(
        "",
        Validators.required,
        this.avaibleNameInArea.bind(this)
      ),
      user: new FormControl("")
    });

    //Mark as touched
    this.form.controls["email"].markAsTouched();
  }

  // ==================================================
  // Create new Member in the area
  // ==================================================
  createMember() {
    let member = this.organizationMembers.filter(
      member =>
        member.user.email.toLowerCase() === this.form.controls["email"].value
    );

    if (!member.length) {
      console.log("El miembro no existe en la organizacion");
      return;
    }

    let payload = {
      area: this.data.area._id,
      member: member[0],
      updated_by: this.data.user
    };

    this.store.dispatch(createAreaMember({ payload: payload }));

    this.dialogRef.close();
  }

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleNameInArea(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      let email = "";
      this.areaMembers.forEach(member => {
        if (
          member.user.email.toUpperCase() ===
          this.form.controls["email"].value.toUpperCase()
        )
          email = member.user.email.toUpperCase();
      });

      if (control.value.toUpperCase() === email) {
        resolve({ avaible: true });
      } else {
        resolve(null);
      }
    });

    return promise;
  }
}
