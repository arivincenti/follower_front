import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { AreaModel } from "src/app/models/area.model";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as MembersActions from "../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions";
import * as MemberActions from "../../../store/actions/userOrganizations/selectedOrganization/members/member/member.actions";
import { MemberModel } from "src/app/models/member.model";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-member-profile",
  templateUrl: "./member-profile.component.html",
  styleUrls: ["./member-profile.component.css"]
})
export class MemberProfileComponent implements OnInit, OnDestroy {
  //UI Observable
  animation$: Observable<string[]>;

  form: FormGroup;
  paramSubscription: Subscription = new Subscription();
  areasSubscription: Subscription = new Subscription();
  memberSubscription: Subscription = new Subscription();
  areas: AreaModel[];
  member: MemberModel;
  member$: Observable<MemberModel>;
  membersLoading$: Observable<boolean>;
  membersLoaded$: Observable<boolean>;
  memberLoading$: Observable<boolean>;
  memberLoaded$: Observable<boolean>;
  param: string;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.membersLoading$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loading
    );

    this.membersLoading$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loading
    );

    this.membersLoaded$ = this.store.select(
      state =>
        state.userOrganizations.selectedOrganization.members.members.loaded
    );

    this.param = this.activatedRoute.snapshot.paramMap.get("id");

    this.store.dispatch(MemberActions.getMember({ payload: this.param }));

    this.areasSubscription = this.store
      .select(
        state => state.userOrganizations.selectedOrganization.areas.areas.areas
      )
      .subscribe(areas => {
        this.areas = areas;
      });

    this.memberSubscription = this.member$
      .pipe(filter(member => member !== null))
      .subscribe(member => {
        this.member = member;
        this.form = this.formBuilder.group({
          areas: this.buildAreas(member)
        });
      });
  }

  ngOnDestroy() {
    this.areasSubscription.unsubscribe();
    this.memberSubscription.unsubscribe();
  }

  buildAreas(member) {
    const values = this.areas.map(area => {
      var boolean = false;

      member.areas.forEach(a => {
        if (area._id === a.toString()) {
          boolean = true;
        }
      });
      return new FormControl(boolean);
    });
    return this.formBuilder.array(values);
  }

  submit() {
    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, {
      areas: valueSubmit.areas
        .map((v: any, i: any) => (v ? this.areas[i]._id : null))
        .filter((v: any) => v !== null)
    });

    this.member.areas = [...valueSubmit.areas];
    // this.store.dispatch(MembersActions.updateMember({ payload: this.member }));
  }

  backToLastPage() {
    this.router.navigate([
      "app/organizations/profile",
      this.member.organization
    ]);
  }
}
