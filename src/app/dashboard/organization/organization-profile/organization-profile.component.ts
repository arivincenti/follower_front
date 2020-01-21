import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { UserModel } from 'src/app/models/user.model';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as OrganizationActions from '../../../store/actions/userOrganizations/selectedOrganization/organization.actions';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../../area/area-form/area-form.component';
import { MemberFormComponent } from '../../member/member-form/member-form.component';
import { MemberModel } from 'src/app/models/member.model';
import { map } from 'rxjs/operators';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy
{
  //Subject Observable
  private subjectMemberAreas$ = new Subject<any>();
  subjectObject = {
    areas: [],
    members: []
  }

  //Subscriptions
  organizationSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  memberAreasSubscription: Subscription = new Subscription();
  membersSubscription: Subscription = new Subscription();
  areasSubscription: Subscription = new Subscription();


  organization$: Observable<OrganizationModel>;
  organizationLoading$: Observable<boolean>;
  user: UserModel;
  animation$: Observable<string[]>;
  organization: OrganizationModel;

  //Filter & counter
  param: string;

  //Areas
  areas$: Observable<AreaModel[]>;
  areasLoading$: Observable<boolean>;
  areasLoaded$: Observable<boolean>;
  filterAreas: AreaModel[];

  //Member Areas
  memberAreas$: Observable<AreaModel[]>;
  memberAreasLoading: boolean = false;
  filterMemberAreas: AreaModel[];

  //Members
  members$: Observable<MemberModel[]>;
  membersLoading$: Observable<boolean>;
  membersLoaded$: Observable<boolean>;
  filterMembers: MemberModel[];


  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit()
  {

    this.param = this.activatedRoute.snapshot.paramMap.get('id');

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    this.animation$ = this.store.select(state => state.ui.animated);

    //Loadings
    this.areasLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.loading);

    this.areasLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.loaded);

    this.membersLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loading);

    this.membersLoaded$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.loaded);

    this.organizationLoading$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.loading);

    /////////////////

    this.store.dispatch(OrganizationActions.getOrganization({ organization: this.param, user: this.user._id }))

    this.organization$ = this.store.select(state => state.userOrganizations.selectedOrganization.organization.organization).pipe(map(organization => this.organization = organization));

    this.areas$ = this.store.select(state => state.userOrganizations.selectedOrganization.areas.areas.areas).pipe(map(areas => this.filterAreas = areas));

    this.members$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members).pipe(map(members => this.filterMembers = members));

    this.membersSubscription = this.members$.subscribe(members =>
    {
      this.subjectObject.members = members;
      this.subjectMemberAreas$.next(this.subjectObject);
    });

    this.areasSubscription = this.areas$.subscribe(areas =>
    {
      this.subjectObject.areas = areas;
      this.subjectMemberAreas$.next(this.subjectObject);
    });

    //Este metodo no es del store ni de un servicio, esta declarado en este componente
    this.memberAreas$ = this.getMemberAreas$().pipe(map(data =>
    {
      var memberAreas: AreaModel[] = [];

      if (data.areas.length && data.members.length)
      {
        var userMember = null;

        data.members.forEach((member: MemberModel) =>
        {
          if (member.user._id === this.user._id) userMember = member;
        });

        userMember.areas.forEach((memberArea: any) =>
        {
          data.areas.forEach((area: AreaModel) =>
          {
            if (area._id === memberArea)
            {
              memberAreas.push(area);
            }
          });
        });
      }

      return memberAreas
    }));

    //Esto esta de mas, deberia utilizar los miembros existentes y las areas existentes, junto al usuario logueado, para no hacer una consulta a la base de datos.

    // this.memberAreas$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.memberAreas.areas).pipe(map(areas => this.filterMemberAreas = areas));

  }

  ngOnDestroy()
  {
    this.organizationSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
    this.areasSubscription.unsubscribe();
  }

  //Funcion Observable
  getMemberAreas$(): Observable<any>
  {
    return this.subjectMemberAreas$.asObservable();
  }

  createArea(): void
  {
    this.dialog.open(AreaFormComponent, {
      width: '600px',
      data: {
        user: this.user,
        organization: this.organization,
        area: null
      }
    });
  }

  createMember(): void
  {
    this.dialog.open(MemberFormComponent, {
      width: '600px',
      data: {
        user: this.user,
        organization: this.organization,
        area: null
      }
    });
  }

  updateOrganization(organization: OrganizationModel): void
  {
    this.dialog.open(OrganizationFormComponent, {
      width: '600px',
      data: {
        organization: organization,
        user: this.user
      }
    });
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations']);
  }

}
