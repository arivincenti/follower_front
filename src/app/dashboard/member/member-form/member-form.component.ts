import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataMember } from '../../../models/interfaces/dialogDataMember';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members.actions';
import { MemberModel } from 'src/app/models/member.model';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit, OnDestroy
{
  //UI Observable
  animation$: Observable<string[]>;

  userSubscription: Subscription = new Subscription();
  membersSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();
  form: FormGroup;
  users$: Observable<UserModel[]>;
  user: UserModel;
  members: MemberModel[];

  email = new FormControl();

  constructor(
    private store: Store<AppState>,
    private _usersService: UsersService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataMember
  ) { }


  ngOnInit()
  {
    this.userSubscription = this.store.select(state => state.auth.user).subscribe(user => this.user = user);

    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      user: new FormControl('')
    });

    //Mark as touched
    this.form.controls['email'].markAsTouched();

    this.animation$ = this.store.select(state => state.ui.animated);
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  searchUsers()
  {
    let payload = {
      email: this.form.controls['email'].value
    }
    this.users$ = this._usersService.getUsersByEmail(payload);
  }

  createMember()
  {
    let member;

    this.membersSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members).subscribe(members => this.members = members);

    if (this.members.includes(this.form.controls['email'].value))
    {
      console.log('El miembro ya existe en la organizaion');
      return;
    }

    let payload = {
      email: this.form.controls['email'].value,
    }

    this._usersService.getUsersByEmail(payload).subscribe(user =>
    {
      if (!user.length)
      {
        console.log('No se encontro el usuario');
        return;
      };

      let payload = {
        organization: this.data.organization,
        user: user[0]._id,
        created_by: this.user._id
      }

      this.store.dispatch(MembersActions.createMember({ payload }));
    });

    this.dialogRef.close();
  }

}
