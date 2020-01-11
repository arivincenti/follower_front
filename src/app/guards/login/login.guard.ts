import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate
{

  constructor(private _authService: AuthService) { }

  canActivate(): boolean
  {
    if (this._authService.isLogged())
    {
      return true;
    } else
    {
      this._authService.logout();
      return false;
    }
  }

}
