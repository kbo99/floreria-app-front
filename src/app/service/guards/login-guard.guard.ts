import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private router: Router
    ) {  }

  canActivate() {
      if (this._authService.estaLogueado()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}