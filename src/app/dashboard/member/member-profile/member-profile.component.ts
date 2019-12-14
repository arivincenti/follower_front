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
import { MembersService } from 'src/app/services/members/members.service';

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
  areas: AreaModel[];
  member: MemberModel;
  param: string;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _membersService: MembersService,
    private router: Router
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    this.param = this.activatedRoute.snapshot.paramMap.get('id');

    this.store.dispatch(MemberActions.getMember({ payload: this.param }));

    this.areasSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas).subscribe(areas =>
    {
      this.areas = areas;
    });

    this._membersService.getMember(this.param).subscribe(member =>
    {
      this.member = member;
      this.form = this.formBuilder.group({
        areas: this.buildAreas(member)
      });
    })

  }

  buildAreas(member)
  {
    const values = this.areas.map(area =>
    {
      var boolean = false;

      member.areas.forEach(a =>
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

    this.member.areas = [...valueSubmit.areas];
    this.store.dispatch(MemberActions.updateMember({ payload: this.member }));
  }

  ngOnDestroy()
  {
    this.areasSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }


  backToLastPage()
  {
    this.router.navigate(['app/organizations/profile', this.member.organization]);
  }

}
