import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataMember } from '../../../models/interfaces/dialogDataMember';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions';
import { MemberModel } from 'src/app/models/member.model';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit, OnDestroy
{
  membersSubscription: Subscription = new Subscription();
  form: FormGroup;
  users$: Observable<UserModel[]>;
  members: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private _usersService: UsersService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataMember
  ) { }


  ngOnInit()
  {
    
    this.membersSubscription = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members).subscribe(members => this.members = members);

    this.form = new FormGroup({
      email: new FormControl('', Validators.required, this.avaibleName.bind(this)),
      user: new FormControl('')
    });

    //Mark as touched
    this.form.controls['email'].markAsTouched();
  }

  ngOnDestroy()
  {
    this.membersSubscription.unsubscribe();
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
        organization: this.data.organization._id,
        user: user[0]._id,
        created_by: this.data.user._id
      }

      this.store.dispatch(MembersActions.createMember({ payload }));
    });

    this.dialogRef.close();
  }


  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleName(control: FormControl): Promise<any> | Observable<any>
  {

    let promise = new Promise((resolve, reject) =>
    {
      let email = '';
      this.members.forEach(member =>
      {
        if (member.user.email.toUpperCase() === this.form.controls['email'].value.toUpperCase()) email = member.user.email.toUpperCase();
      });

      if (control.value.toUpperCase() === email)
      {
        resolve({ avaible: true });
      } else
      {
        resolve(null)
      }
    });

    return promise;
  }

}
