import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import { LocalDataSource } from 'ng2-smart-table';
import { Cosnt } from 'src/app/shared/utils/Const';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';

@Component({
  selector: 'app-movimiento-insumo',
  templateUrl: './movimiento-insumo.component.html',
  styleUrls: ['./movimiento-insumo.component.scss']
})
export class MovimientoInsumoComponent implements OnInit {

  public settings = {
    actions: false,
    columns: {
      img: {
        title: 'Imagen',
        type: 'html',
        editable: false,
        filter: false,
        select: false,
      },
      prodNombre: {
        title: 'Nombre',
        editable: false,
      },
      prodClave: {
        title: 'Codigo',
        editable: false,
      },
      tpoprodNombre: {
        title: 'Tipo Producto',
        editable: false,
        
      },
      prodExistenciaMin: {
        title: 'Existencia',
        editable: false,
        
      },
      compHtml: {
        title: 'Estatus',
        type: 'html',
        editable: true,
        filter: false
      },
      
    },
  };

  source : LocalDataSource;
  lastClickTime: number = 0;
  lstProdTmp: ProductoVO [] = new Array();

  constructor(private _sanitizer: DomSanitizer, private productoService:ProductoService, 
    private router: Router, public _authService: AuthService) { }

  ngOnInit(): void {
    this.findLstProd();
  }

  onUserRowSelect(event) { 
   
    if (this.lastClickTime === 0) {
      this.lastClickTime = new Date().getTime();
    } else {
      const change = (new Date().getTime()) - this.lastClickTime;
      if (change < 800) {
        sessionStorage.setItem(Cosnt.INS_CONFIG,JSON.stringify(event.data));
    this.router.navigate([ 'products/physical/movimiento-insumo-detail']);
      }
      this.lastClickTime = 0;
    }
} 

 
findLstProd(){
  const _this = this;
  this.productoService.getProdByestatus('AC').subscribe(
    correcto => {
      this.lstProdTmp = correcto as Array<ProductoVO>;
      console.log(correcto)
        this.lstProdTmp.forEach(function(value) {
    
          if(value.imgDefault !== null && value.imgDefault.length > 0){
            value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
            changingThisBreaksApplicationSecurity
            +"' class='imgTable'>"
          }
          value.compHtml = "<i class='fa fa-circle font-success f-12'></i>";  
          value.tpoprodNombre = "";
          if(value.tipoProducto !== null){
            value.tpoprodNombre = value.tipoProducto.tpoprodNombre;
          }
        
    });
    this.source = new LocalDataSource(this.lstProdTmp)
  },
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}

}
