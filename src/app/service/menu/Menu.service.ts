import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../AuthService';
import { Menu } from 'src/app/commons/model/menu/Menu';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient, private _authService: AuthService) { }

  menu: Menu [] = [];

  cargarMenu() {
      let url = 'api/usuarios/grupo/menu/getmenu';
      return this.http.post(url,this._authService.getGrupos())
        .map( (resp: any) => {
          this.menu = resp;
          sessionStorage.setItem("menu",  JSON.stringify(this.menu));
          return resp;
        } );
  }

  getmenu(): Menu[] {
    if (sessionStorage.getItem("menu")) {
      this.menu = JSON.parse(sessionStorage.getItem("menu"));
      // console.log("Menu session: ", this.menu);
      return this.menu;
    }
    return null;
  }
}
