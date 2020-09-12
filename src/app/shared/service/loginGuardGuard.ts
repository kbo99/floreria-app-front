import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth-service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private router: Router
    ) {  }

  canActivate() {
      if (this._authService.estaLogueado()) {
        console.log("Login Correcto");
        return true;
      } else {
        console.log("No se encuentra el usuario");
        this.router.navigate(['/auth/login']);
        return false;
      }
  }
}
