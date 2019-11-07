import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { AuthService } from "src/app/services/auth/auth.service";
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit
{

  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor(
    // private _authService: AuthService,
    // private store: Store<AppState>
  ) { }

  ngOnInit()
  {
  //  this.subscription = this.store.select('ui').subscribe(ui =>
  //   {
  //     this.cargando = ui.isLoading;
  //   });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  crearUsuario(form: NgForm)
  {
    // this._authService.crearUsuario(
    //   form.value.nombre,
    //   form.value.email,
    //   form.value.password
    // );
  }
}
