import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../AuthService';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const expectedRole = next.data.expectedRole;
      //console.log("expectedRole: ", expectedRole);
      if (this._authService.hasRole(expectedRole)) {
        return true;
      } else {
        console.log("Acceso denegado a este recurso");
        Swal.fire("Acceso denegado", "No posees permisos para abrir este modulo", "warning");
        this.router.navigate(['']);
        return false;
      } 
  }
}
