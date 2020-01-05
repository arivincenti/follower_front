import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService
{

  tokenSubscription: Subscription = new Subscription();
  token: string;

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    this.token = '';
    this.tokenSubscription = this.store.select(state => state.auth.token).subscribe(token => this.token = token);

    this.tokenSubscription.unsubscribe();

    console.log('paso por el interceptor');
    let headers = new HttpHeaders({
      token: this.token
    });

    const reqClone = req.clone({
      headers
    })

    return next.handle(reqClone);
    // throw new Error("Method not implemented.");
  }

}
