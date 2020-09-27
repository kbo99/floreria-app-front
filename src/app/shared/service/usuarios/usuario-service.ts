import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { Usuario } from '../../model/usuario/Usuario';

@Injectable({
	providedIn: 'root'
})

export class UsuarioService {
    constructor(
        public http: HttpClient,
        public router: Router
      ) {
      }



  generateUserN(usuario: Usuario){
    let url = 'usuarios/guardar';
    console.log("Guardando Usuario");
    return this.http.post( url, usuario)
                .map( (resp: any) => {
                  return resp;
                });
  }
 
  findAll() {
    let url = 'usuarios/findAll';
    return this.http.get( url, {})
                .map( (resp: any) => {
                  return resp;
                });
  }

  findAllGrupos() {
    let url = "usuarios/grupo/findAll";
    return this.http.get( url, {})
                .map( (resp: any) => {
                  return resp;
                });
  }
  
}