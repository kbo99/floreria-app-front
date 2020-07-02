import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHttpInterceptor } from './Interceptor/CustomHttpInterceptor';

import {UsuarioService,
  AuthService,
  LoginGuardGuard,
  RoleGuardServiceGuard,
  MenuService } from './services.index';


@NgModule({
  imports: [ 
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    AuthService,
    LoginGuardGuard,
    RoleGuardServiceGuard,
    MenuService,
    {  provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
   }
   
],
  declarations: []
})
export class ServiceModule { }
