import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OrdenVO } from '../../model/Venta/OrdenVO';

@Injectable({
  providedIn: 'root'
})
export class VentaService{
    constructor(public http: HttpClient,
        public router: Router) { }

    findByPtipEstatus(estatus: string){  
        let url = 'ventas/findPagoEstatus';
        return this.http.post( url, null)
                    .map( (resp: any) => {
                      return resp;
                    });
    }

    findByPmetEstatus(estatus: string){
      let url = 'ventas/findMetodoPago';
      return this.http.post( url, null)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    findByHrenEstatus(estatus: string){
      let url = 'ventas/findByHrenEstatus';
      return this.http.post( url, estatus)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    findByCapEstatus(estatus: string){
      let url = 'ventas/findByCapEstatus';
      return this.http.post( url, estatus)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    generaOrden(ordenVO: OrdenVO){
      let url = 'ventas/saveOrden';
      console.log("Guardando Orden");
      return this.http.post( url, ordenVO)
                  .map( (resp: any) => {
                    return resp;
                  });
    }
}