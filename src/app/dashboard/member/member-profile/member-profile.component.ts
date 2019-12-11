import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AreaModel } from 'src/app/models/area.model';
import { FormGroup, FormBuilder, FormArray, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as MemberActions from '../../../store/actions/userOrganizations/selectedOrganization/members/member.actions';
import { MemberModel } from 'src/app/models/member.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit, OnDestroy
{

  //UI Observable
  animation$: Observable<string[]>;

  form: FormGroup;
  paramSubscription: Subscription = new Subscription();
  areasSubscription: Subscription = new Subscription();
  memberSubscription: Subscription = new Subscription();
  areas: AreaModel[];
  memberAreas: any;
  member: MemberModel;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.areasSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas).subscribe(areas => this.areas = areas);

    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.store.dispatch(MemberActions.getMember({ payload: param.id }));
      this.memberSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.members.selectedMember.member).subscribe(member =>
      {
        this.member = member;
      });
    });

    this.form = this.formBuilder.group({
      areas: this.buildAreas()
    });
  }

  buildAreas()
  {
    const values = this.areas.map(area =>
    {
      var boolean = false;

      this.member.areas.forEach(a =>
      {
        if (area._id === a.toString())
        {
          boolean = true;
        }
      });

      return new FormControl(boolean);
    });
    return this.formBuilder.array(values);
  }

  submit()
  {
    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, { areas: valueSubmit.areas.map((v: any, i: any) => v ? this.areas[i]._id : null).filter((v: any) => v !== null) });

    console.log(valueSubmit);
  }

  ngOnDestroy()
  {
    this.areasSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.memberSubscription.unsubscribe();
  }


  backToLastPage()
  {
    this.router.navigate(['app/organizations/profile', this.member.organization]);
  }

}
