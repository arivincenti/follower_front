import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  tokenSubscription: Subscription = new Subscription();
  token: string;

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
    this.router.navigate(['login']);
  }

  // ==================================================
  // Verificar si esta logueado
  // ==================================================
  isLogged()
  {
    this.token = '';
    this.tokenSubscription = this.store.select(state => state.auth.token).subscribe(token => this.token = token);

    this.tokenSubscription.unsubscribe();

    return this.token ? true : false;
  }

  // ==================================================
  // Renovar Token
  // ==================================================
  refreshToken()
  {
    return this.http.get(`${environment.path}/auth/refreshToken`)
      .pipe(
        map((res: any) =>
        {
          // Hay que actualizar el token de auth con la respuesta (hacer el action)
          console.log("Token renovado");
          return true;
        }),
        catchError(error =>
        {
          this.logout();

          Swal.fire({
            type: "error",
            title: "Ups! Hubo un problema",
            text: "No fue posible renovar el token"
          });

          throw error;
        })
      );
  }

}