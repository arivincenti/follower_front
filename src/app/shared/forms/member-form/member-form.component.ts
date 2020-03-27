import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Observable, Subscription, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { UserModel } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users/users.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MemberModel } from "src/app/models/member.model";
import { DialogDataArea } from "src/app/models/interfaces/dialogDataArea";
import { AreaModel } from "src/app/models/area.model";
import { MembersService } from "src/app/services/members/members.service";
import * as MembersActions from "../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions";
import * as AreaActions from "../../../store/actions/userOrganizations/selectedOrganization/areas/area/area.actions";
import { map, filter, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-member-form",
  templateUrl: "./member-form.component.html",
  styleUrls: ["./member-form.component.css"]
})
export class MemberFormComponent implements OnInit, OnDestroy {
  private unsuscribe$ = new Subject();

  organizationMembersSubscription: Subscription = new Subscription();
  areaMembersSubscription: Subscription = new Subscription();
  form: FormGroup;
  users$: Observable<UserModel[]>;
  members$: Observable<MemberModel[]>;
  organizationMembers$: Observable<MemberModel[]>;
  organizationMembers: MemberModel[];
  areaMembers$: Observable<MemberModel[]>;
  areaMembers: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private _usersService: UsersService,
    private _membersService: MembersService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataArea
  ) {}

  ngOnInit() {
    //Traigo todos los miembros de la organizacion y los filtro para que cada area tenga sus respectivos miembros
    this.organizationMembers$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.members
    );

    this.areaMembers$ = this.store
      .select(
        state =>
          state.userOrganizations.selectedOrganization.areas.selectedArea.area
      )
      .pipe(
        filter(area => area !== null),
        map(areas => areas.members)
      );

    this.areaMembers$.pipe(takeUntil(this.unsuscribe$)).subscribe(members => {
      this.areaMembers = members;
    });

    this.organizationMembers$
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(members => {
        this.organizationMembers = members;
      });

    this.setForm(this.data.area);
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.unsubscribe();
  }

  setForm(area: AreaModel) {
    if (area) {
      this.form = new FormGroup({
        email: new FormControl(
          "",
          Validators.required,
          this.avaibleNameInArea.bind(this)
        ),
        user: new FormControl("")
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl(
          "",
          Validators.required,
          this.avaibleNameInOrganization.bind(this)
        ),
        user: new FormControl("")
      });
    }

    //Mark as touched
    this.form.controls["email"].markAsTouched();
  }

  searchUsers() {
    let payload = {
      email: this.form.controls["email"].value,
      organization: this.data.organization._id
    };

    //Operador ternario
    if (this.data.area) {
      this.members$ = this._membersService.getMembersByEmail(payload);
    } else {
      this.users$ = this._usersService.getUsersByEmail(payload);
    }
  }

  createMember() {
    if (this.data.area) {
      let member = this.organizationMembers.find(
        member =>
          member.user.email.toLowerCase() ===
          this.form.controls["email"].value.toLowerCase()
      );

      let payload = {
        area: this.data.area._id,
        member: member
      };

      this.store.dispatch(AreaActions.createAreaMember({ payload: payload }));
    } else {
      let payload = {
        email: this.form.controls["email"].value
      };

      this._usersService.getUsersByEmail(payload).subscribe(user => {
        let member = {
          organization: this.data.organization,
          user: user[0]._id,
          created_by: this.data.user
        };

        this.store.dispatch(MembersActions.createMember({ payload: member }));
      });
    }

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

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleNameInOrganization(
    control: FormControl
  ): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      let email = "";
      this.organizationMembers.forEach(member => {
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
