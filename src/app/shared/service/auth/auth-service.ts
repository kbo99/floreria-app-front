import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Cosnt } from '../../utils/Const';

import { PayLoad } from '../../model/usuario/PayLoad';
import { Grupo } from '../../model/usuario/Grupo';
import { Usuario } from '../../model/usuario/Usuario';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

  private _token: string = "";
  public payload: PayLoad;
  private _usuario: Usuario;

  constructor(
      public http: HttpClient,
      public router: Router,
    ) {
      this.cargarStorage();
    }

    public get token(): string {
      if (this.estaLogueado()) return this._token;
      return null;
    }

    public estaLogueado(): Boolean {
      if (this._token.length > 5) {
        this.cargaUsuario();
        return true;
      }
      return false;
    }
  
    private cargarStorage(): void {
       if ( localStorage.getItem('token')) this._token = localStorage.getItem('token');
       else this._token = '';
    }
  
    private guardarStorage( token: string): void {
  
      // localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      this._token = token;
      //console.log('token: ' + token);
      this.cargaUsuario();
    }

    cargaUsuario(): void {
      this.payload = JSON.parse(atob(this._token.split(".")[1]));
      this.payload = JSON.parse(atob(this._token.split(".")[1]));
      this._usuario = new Usuario();
      this._usuario.cargaUsuario(this.payload);
      //console.log("usuario: ", this._usuario);
    }
  
    public logout(): void {
      this._token = '';
      localStorage.removeItem('token');
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
    }
  
    public login( username: string, password: string, recordar: boolean = false ): Observable<Boolean> {
  
      if ( recordar ) {
       // localStorage.setItem('username', usuario.username );
      }else {
      //  localStorage.removeItem('username');
      }
  
       let url = 'oauth/token';
       const credenciales = btoa(Cosnt.CLI_ID + ':' + Cosnt.SECRET);  
       const httpHeaders = new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + credenciales,
         
       });
   
       let params = new URLSearchParams();
       params.set('grant_type', 'password');
       params.set('username', username);
       params.set('password', password);
       console.log(params.toString());
       return this.http.post<any>(url, params.toString(), { headers: httpHeaders }).map( (resp: any) => {
          this.guardarStorage(resp.access_token);
          return true;
        });;
    }

    hasRole(role: string): boolean {
      if(role == null || role == "" || this._usuario == null) return false;
      return this._usuario.hashGrup(role);
    }

    getGrupos():Grupo[] {
      if (this._usuario && this._usuario.grupos.length > 0)
        return this._usuario.grupos
      return [];
    }

}
