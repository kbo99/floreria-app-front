import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../service/services.index';

//import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  errMess = '';

  constructor(
    public router: Router,
    public _authService: AuthService ) { }

  ngOnInit() {
    init_plugins();
    this.errMess = '';
    if (this._authService.estaLogueado())  this.router.navigate(['/dashboard']);
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return; 
    }
    this._authService.login( forma.value.email, forma.value.password, forma.value.recuerdame ).subscribe(
             correcto => this.router.navigate(['/dashboard']),
            error => {
              //console.error('Error al buscar usuario: ' + error);
              this.errMess = 'Usuario o contraseña invalido ';
              //console.error(this.errMess);
            } );

  }

  logout() {
    this._authService.logout();
  }
}
