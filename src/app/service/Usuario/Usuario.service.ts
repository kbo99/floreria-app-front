import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Cosnt } from '../../shared/utils/Const';

declare let swal: any;
@Injectable()
export class UsuarioService {



  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    
  }




  // crearUsuario( usuario: Usuario ) {

  //   let url = '/usuario';

  //   return this.http.post( url, usuario )
  //             .map( (resp: any) => {

  //               swal('Usuario creado', usuario.username, 'success' );
  //               return resp.usuario;
  //             });
  // }

  // getPersonaLogin(): Observable<PersonaVO> {
  //   let url = "persona/id";
  //   // console.log("Buscando persona" + this.usuario.perId);
  //   return this.http.post( url, this.usuario.perId)
  //               .map( (resp: any) => {
  //                 this.salvapersona(resp);
  //                 return resp;
  //               });
  // }

  // salvapersona(persona: PersonaVO) {
  //   localStorage.setItem('personaLogin', JSON.stringify(persona));
  //   this.personaVO = persona;
  // }

  // findAllUserByEstatus(arrStatus: string []){
  //   let url = 'usuario/allUserByestatus';
  //   return this.http.post( url, arrStatus)
  //               .map( (resp: any) => {
  //                 return resp;
  //               });
  // }

  // findAllGpr(){
  //   let url = 'usuario/allGpr';
  //   return this.http.post( url, null)
  //               .map( (resp: any) => {
  //                 return resp;
  //               });
  // }

  // findLstGroupNotIn(grupo: GrupoVO[]){
  //   let url = 'usuario/findLstGroupNotIn';
  //   return this.http.post( url, grupo)
  //               .map( (resp: any) => {
  //                 return resp;
  //               });
  // }

  // generateUserN(usuario: UsuarioVO){
  //   let url = 'usuario/generateUser';
  //   return this.http.post( url, usuario)
  //               .map( (resp: any) => {
  //                 return resp;
  //               });
  // }

  // hasRole(role: string): boolean {
  //   let isHasGrup: boolean = false;
  //   this.usuario.authorities.forEach(roleUsuario => {
  //       if (role === roleUsuario.authority) {
  //         isHasGrup = true;
  //       }
  //   });
  //   return isHasGrup;
  // }

  getAllUsers(){

  }
}
