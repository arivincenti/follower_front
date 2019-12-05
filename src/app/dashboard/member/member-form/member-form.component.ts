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
import { MemberModel } from 'src/app/models/member.model';
import Swal from 'sweetalert2';

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
  areaMembersSubscription: Subscription = new Subscription();
  param: string;
  email: string;
  selectedUser: UserModel;
  users$: Observable<UserModel[]>;
  avaible: boolean = true;
  area: AreaModel;
  loading: boolean = false;
  areaMembers: MemberModel[];

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

      // this.areaSubscription = this.store.select(state => state.userOrganizations.selectedArea.selectedArea.area).subscribe(area => this.area = area);
    });

    // this.areaMembersSubscription = this.store.select(state=> state.selectedArea.areaMembers.members).subscribe(members => this.areaMembers = members);
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
    this.areaMembersSubscription.unsubscribe();
  }

  searchUsers()
  {
    let payload = {
      email: this.email,
      area: this.area
    }

    this.users$ = this._usersService.getUsersByEmail(payload);
  }

  selectUser(user: UserModel)
  {
    this.selectedUser = user;
  }

  createMember()
  {

    if(this.areaMembers.find(member => member.user._id === this.selectedUser._id)){
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'warning',
        title: 'Oops!!',
        text: `El usuario ${this.selectedUser.name} ${this.selectedUser.last_name} ya es miembro del área`,
        showConfirmButton: false,
        timer: 2700
      });
      return;
    }

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
