import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './services/service.module';

//NGRX
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

//Components
import { AppComponent } from './app.component';
import { appReducers } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/interceptors/token/token-interceptor.service';
import { WebComponent } from './web/web.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';


//Configuracion de zona horaria e idioma de fechas
import { LOCALE_ID } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsAr, 'es-Ar');


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any>
{
  return localStorageSync({ keys: [{'ui': ['theme']}, 'auth', 'userOrganizations'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    WebComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    ServiceModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forRoot(
      appReducers,
      { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-Ar' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
