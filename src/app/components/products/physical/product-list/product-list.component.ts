import { Component, OnInit } from '@angular/core';
import { productDB } from 'src/app/shared/tables/product-list';
import { ProductoVO } from '../../../../shared/model/Producto/ProductoVO';
import { DomSanitizer } from '@angular/platform-browser';
import { Cosnt } from '../../../../shared/utils/Const';
import { Router } from '@angular/router';

import { ProductoService} from '../../../../shared/service/producto/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = []
  public producto: ProductoVO;
  public lstProd: ProductoVO[] = new Array();
  constructor(
    private _sanitizer: DomSanitizer, private router: Router, private productoService:ProductoService) {
    this.findLstProd();
  }

  ngOnInit() {}
  findLstProd(){
    const _this = this;
    this.productoService.getProdByestatus('PC').subscribe(
      correcto => {
        this.lstProd = correcto as Array<ProductoVO>;
        this.lstProd.forEach(function(value) {
         
          if(value.imgDefault !== null && value.imgDefault.length > 0){
            value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
            changingThisBreaksApplicationSecurity
            +"' class='imgTable'>"
          }
         
        });
    },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
    
  }
  


   toggleMe(id: any): void {

    sessionStorage.setItem(Cosnt.PROD_CONFIG,JSON.stringify(id));
    this.router.navigate([ 'products/physical/add-product']);
  }
}
