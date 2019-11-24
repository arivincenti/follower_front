import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { AuthService } from "src/app/services/auth/auth.service";
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit
{

  name: string;
  last_name: string;
  email: string;
  password: string;
  cargando: boolean = false;

  constructor(
    private _authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  crearUsuario()
  {
    this.cargando = true;
    
    let user = {
      name: this.name.toUpperCase(),
      last_name : this.last_name.toUpperCase(),
      email: this.email.toUpperCase(),
      password: this.password.toUpperCase()
    }

    this._authService.register(user).subscribe(user =>
    {
      this.router.navigate(['/login']);
      this.cargando = false;
    })

    this.cargando = false;
  }
}
