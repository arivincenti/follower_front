import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/services/members/members.service';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import * as AreasActions from '../../../store/actions/areas/areas.actions';
import { AreaModel } from 'src/app/models/area.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit, OnDestroy
{
  //UI Observable
  animation$: Observable<string[]>;

  paramSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();
  areaSubscription: Subscription = new Subscription();
  param: string;
  email: string;
  selectedUser: UserModel;
  users$: Observable<UserModel[]>;
  avaible: boolean = true;
  area: AreaModel;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _membersService: MembersService,
    private _usersService: UsersService
  ) { }

  ngOnInit()
  {
    this.animation$ = this.store.select(state => state.ui.animated);

    //Params subscription
    this.paramSubscription = this.activatedRoute.params.subscribe(param =>
    {
      this.param = param.id;

      this.areaSubscription = this.store.select(state => state.selectedArea.selectedArea.area).subscribe(area => this.area = area);
    });

  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
  }

  searchUsers()
  {

    let payload = {
      email: this.email
    }

    this.users$ = this._usersService.getUsersByEmail(payload);
  }

  selectUser(user: UserModel)
  {
    this.selectedUser = user;
  }

  createMember()
  {
    let payload = {
      organization: this.area.organization,
      area: this.area._id,
      user: this.selectedUser._id,
      role: 'MIEMBRO'
    }

    this.store.dispatch(AreasActions.createAreaMember({ payload: payload }));
    
  }

  backToLastPage()
  {
    this.router.navigate(['app/organizations/areas/profile', this.param]);
  }

}
