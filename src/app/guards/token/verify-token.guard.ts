import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.reducer";
import { AuthService } from "../../services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class VerifyTokenGuard implements CanActivate, CanLoad {
  tokenSubscription: Subscription = new Subscription();
  token: string;

  constructor(
    private store: Store<AppState>,
    private _authService: AuthService
  ) {}

  canActivate(): Promise<boolean> | boolean {
    this.tokenSubscription = this.store
      .select(state => state.auth.token)
      .subscribe(token => (this.token = token));

    this.tokenSubscription.unsubscribe();

    let payload = JSON.parse(atob(this.token.split(".")[1]));

    let expired = this.expirado(payload.exp);

    if (expired) {
      console.log("Token expirado");
      this._authService.logout();
      return false;
    }

    return this.verificaSiRenueva(payload.exp);
  }

  canLoad(): Promise<boolean> | boolean {
    this.tokenSubscription = this.store
      .select(state => state.auth.token)
      .subscribe(token => (this.token = token));

    this.tokenSubscription.unsubscribe();

    let payload = JSON.parse(atob(this.token.split(".")[1]));

    let expired = this.expirado(payload.exp);

    if (expired) {
      console.log("Token expirado");
      this._authService.logout();
      return false;
    }

    return this.verificaSiRenueva(payload.exp);
  }

  // ==================================================
  // Verificar si se renueva o no el token
  // ==================================================
  verificaSiRenueva(dateExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(dateExp * 1000);
      let now = new Date();

      now.setTime(now.getTime() + 1 * 60 * 60 * 1000);

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._authService.refreshToken().subscribe(() => {
          resolve(true);
        }),
          () => {
            reject(false);
          };
      }
    });
  }

  // ==================================================
  // Valida si el token expiró o no
  // ==================================================
  expirado(dateExp: number) {
    let now = new Date().getTime() / 1000;

    if (dateExp < now) {
      return true;
    } else {
      return false;
    }
  }
}
