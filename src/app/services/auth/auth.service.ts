import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: any)
  {
    return this.http.post(`${environment.path}/auth/login`, credentials);
  }

  logout()
  {
    this.router.navigate(['login']);
  }

}