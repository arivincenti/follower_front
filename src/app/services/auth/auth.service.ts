import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import * as OrganizationsActions from '../../store/actions/organizations/organizations.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) { }

  register(user: any)
  {
    return this.http.post(`${environment.path}/auth/register`, user);
  }

  login(credentials: any)
  {
    return this.http.post(`${environment.path}/auth/login`, credentials);
  }

  logout()
  {
    this.store.dispatch(OrganizationsActions.clearState());
    this.router.navigate(['login']);
  }

}