import { Component, OnInit, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { MemberModel } from 'src/app/models/member.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MemberFormComponent } from '../../member/member-form/member-form.component';
import { DialogDataArea } from 'src/app/models/interfaces/dialogDataArea';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-area-member-form',
  templateUrl: './area-member-form.component.html',
  styleUrls: ['./area-member-form.component.css']
})
export class AreaMemberFormComponent implements OnInit
{

  membersSubscription: Subscription = new Subscription();
  form: FormGroup;
  users$: Observable<UserModel[]>;
  members$: Observable<MemberModel[]>;
  members: MemberModel[];

  constructor(
    private store: Store<AppState>,
    private _usersService: UsersService,
    private dialogRef: MatDialogRef<MemberFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataArea
  ) { }


  ngOnInit()
  {
    //Traigo todos los miembros de la organizacion y los filtro para que cada area tenga sus respectivos miembros
    this.members$ = this.store.select(state => state.userOrganizations.selectedOrganization.members.members.members)
      .pipe(map((members: any) =>
      {
        var membersFiltered = [];

        members.forEach((member: MemberModel) =>
        {
          member.areas.forEach((area: any) =>
          {
            if (area === this.data.area._id)
            {
              membersFiltered.push(member)
            }
          });
        });

        return membersFiltered;
      }));

    this.membersSubscription = this.members$
      .subscribe(members =>
      {
        this.members = members;
      })

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

  addMember()
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

      let member = {
        organization: this.data.organization,
        area: this.data.area,
        user: user[0]._id,
        created_by: this.data.user,
      };

      this.store.dispatch(MembersActions.createMember({ payload: member }));

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
