import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { UserModel } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users/users.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MemberModel } from "src/app/models/member.model";
import { DialogDataArea } from "src/app/models/interfaces/dialogDataArea";
import * as MemberActions from "../../../store/actions/userOrganizations/organization/member/member.actions";
import { members } from "src/app/store/selectors/userOrganizations/organization/organization/members/members.selector";
import { SubSink } from "subsink";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.css"],
})
export class MemberFormComponent implements OnInit, OnDestroy {
  subs = new SubSink();

  form: FormGroup;
  users$: Observable<UserModel[]>;
  organizationMembers$: Observable<MemberModel[]>;
  organizationMembers: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private _usersService: UsersService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataArea
  ) {
    this.organizationMembers$ = this.store.select(members);

    this.subs.add(
      this.organizationMembers$.subscribe(
        (members) => (this.organizationMembers = members)
      )
    );
  }

  ngOnInit() {
    this.setForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  setForm() {
    this.form = new FormGroup({
      email: new FormControl(
        "",
        Validators.required,
        this.avaibleNameInOrganization.bind(this)
      ),
      user: new FormControl(""),
    });
    //Mark as touched
    this.form.controls["email"].markAsTouched();
  }

  searchUsers() {
    let payload = {
      email: this.form.controls["email"].value,
      organization: this.data.organization._id,
    };

    this.users$ = this._usersService.getUsersByEmail(payload);
  }

  createMember() {
    let payload = {
      email: this.form.controls["email"].value,
    };

    this._usersService.getUsersByEmail(payload).subscribe((user) => {
      let member = {
        organization: this.data.organization,
        user: user[0]._id,
        created_by: this.data.user,
      };

      this.store.dispatch(MemberActions.createMember({ payload: member }));
    });

    this.dialogRef.close();
  }

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleNameInOrganization(
    control: FormControl
  ): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      let email = "";
      this.organizationMembers.forEach((member) => {
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
