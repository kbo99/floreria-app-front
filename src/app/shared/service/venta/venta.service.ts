import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VentaService{
    constructor(public http: HttpClient,
        public router: Router) { }

    findByPtipEstatus(estatus: string){
        let url = 'ventas/findByPtipEstatus';
        return this.http.post( url, estatus)
                    .map( (resp: any) => {
                      return resp;
                    });
    }

    findByPmetEstatus(estatus: string){
      let url = 'ventas/findByPmetEstatus';
      return this.http.post( url, estatus)
                  .map( (resp: any) => {
                    return resp;
                  });
  }
}