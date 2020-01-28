import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { MemberModel } from 'src/app/models/member.model';
import * as AreaActions from '../../../store/actions/userOrganizations/selectedOrganization/areas/area/area.actions';
import { map, filter } from 'rxjs/operators';
import { MemberFormComponent } from '../../member/member-form/member-form.component';
import { MatDialog } from '@angular/material';
import { AreaFormComponent } from '../area-form/area-form.component';

@Component({
	selector: 'app-area-profile',
	templateUrl: './area-profile.component.html',
	styleUrls: [ './area-profile.component.css' ]
})
export class AreaProfileComponent implements OnInit, OnDestroy {
	userSubscription: Subscription = new Subscription();
	paramSubscription: Subscription = new Subscription();

	animation$: Observable<string[]>;
	param: string;
	user: UserModel;

	area$: Observable<AreaModel>;
	area: AreaModel;
	areaLoading$: Observable<boolean>;
	areaLoaded$: Observable<boolean>;

	members$: Observable<MemberModel[]>;
	membersLoading$: Observable<boolean>;
	membersLoaded$: Observable<boolean>;

	constructor (
		private store: Store<AppState>,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog
	) {}

	ngOnInit () {
		this.animation$ = this.store.select((state) => state.ui.animated);
		this.param = this.activatedRoute.snapshot.paramMap.get('id');

		this.store.dispatch(AreaActions.getArea({ payload: this.param }));

		this.userSubscription = this.store.select((state) => state.auth.user).subscribe((user) => {
			this.user = user;
		});

		this.area$ = this.store
			.select((state) => state.userOrganizations.selectedOrganization.areas.selectedArea.area)
			.pipe(filter((area) => area !== null), map((area) => (this.area = area)));

		this.areaLoading$ = this.store.select(
			(state) => state.userOrganizations.selectedOrganization.areas.selectedArea.loading
		);

		this.areaLoaded$ = this.store.select(
			(state) => state.userOrganizations.selectedOrganization.areas.selectedArea.loaded
		);
	}

	ngOnDestroy () {
		this.userSubscription.unsubscribe();
		this.paramSubscription.unsubscribe();
	}

	backToLastPage () {
		this.router.navigate([ 'app/organizations/profile', this.area.organization._id ]);
	}

	addMember (): void {
		this.dialog.open(MemberFormComponent, {
			width: '600px',
			data: {
				user: this.user,
				organization: this.area.organization,
				area: this.area
			}
		});
	}

	updateArea (area: AreaModel) {
		this.dialog.open(AreaFormComponent, {
			width: '600px',
			data: {
				user: this.user,
				organization: area.organization,
				area: area
			}
		});
	}
}
