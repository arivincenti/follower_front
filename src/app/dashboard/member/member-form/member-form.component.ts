import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as MembersActions from '../../../store/actions/userOrganizations/selectedOrganization/members/members/members.actions';
import { MemberModel } from 'src/app/models/member.model';
import { DialogDataArea } from 'src/app/models/interfaces/dialogDataArea';
import { map } from 'rxjs/operators';
import { AreaModel } from 'src/app/models/area.model';


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
        if (this.data.area)
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
        } else
        {
          return members;
        }

      }));

    this.membersSubscription = this.members$
      .subscribe(members =>
      {
        this.members = members;
      })

      this.setForm(this.data.area);

  }

  ngOnDestroy()
  {
    this.membersSubscription.unsubscribe();
  }

  setForm(area: AreaModel)
  {

    if (area)
    {
      this.form = new FormGroup({
        email: new FormControl('', Validators.required, this.avaibleNameInArea.bind(this)),
        user: new FormControl('')
      });
    } else
    {
      this.form = new FormGroup({
        email: new FormControl('', Validators.required, this.avaibleNameInOrganization.bind(this)),
        user: new FormControl('')
      });
    }

    //Mark as touched
    this.form.controls['email'].markAsTouched();
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
  avaibleNameInArea(control: FormControl): Promise<any> | Observable<any>
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

  // ==================================================
  // Organization Name Validator
  // ==================================================
  avaibleNameInOrganization(control: FormControl): Promise<any> | Observable<any>
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
