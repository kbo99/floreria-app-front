import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';
import { Imagen } from 'src/app/shared/model/Imagen/Imagen';
import { TipoProductoVO } from 'src/app/shared/model/Producto/TipoProductoVO';
import { TpoMovProdVO } from 'src/app/shared/model/Producto/TpoMovProdVO';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { Router } from '@angular/router';
import { Cosnt } from 'src/app/shared/utils/Const';
import { AuthService } from 'src/app/shared/service/auth/auth-service';

@Component({
  selector: 'app-movimiento-insumo-detail',
  templateUrl: './movimiento-insumo-detail.component.html',
  styleUrls: ['./movimiento-insumo-detail.component.scss']
})
export class MovimientoInsumoDetailComponent implements OnInit {
  public productForm: FormGroup;
  public counter: number = 1;
  public producto: ProductoVO;

  prodTmp: string;
  currVerifiedLoanOfficerPhoto;
  lstTpoProd:TipoProductoVO [] = new Array();
  lstTpoMo:TpoMovProdVO [] = new Array();
  tipoProducto: TipoProductoVO = new TipoProductoVO();
  constructor(private fb: FormBuilder,
    private _sanitizer: DomSanitizer, private productoService:ProductoService, 
    private router: Router, public _authService: AuthService) {
      this.prodTmp  = sessionStorage.getItem(Cosnt.INS_CONFIG);
      if(this.prodTmp !== null){
        this.producto = JSON.parse(this.prodTmp) as ProductoVO;
        sessionStorage.removeItem(Cosnt.INS_CONFIG);
        
        this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.producto.lstImg[0].imgUrl) as any).
        changingThisBreaksApplicationSecurity;
        this.counter = 0;
        this.productForm = this.fb.group({
          prodId: [this.producto.prodId],
          prodNombre: [this.producto.prodNombre, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodCostoCompra: [this.producto.prodCostoCompra, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodClave: [this.producto.prodClave, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          tpoprodId: [this.producto.tipoProducto.tpoprodId],
          tmpId: [''],
        });
      }else {
        this.router.navigate([ 'products/physical/movimiento-insumo']);
      }
      
   
  }

  ngOnInit(): void {
    this.findLstProd();
    this.findLstMov();
  }

  findLstProd(){
    this.productoService.getTpoProdByestatus('AC').subscribe(
      correcto => {
        this.lstTpoProd = correcto as Array<TipoProductoVO>;
          
    },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
  
  
  }

  findLstMov(){
    this.productoService.getTpoMovByestatus().subscribe(
      correcto => {
        this.lstTpoMo = correcto as Array<TpoMovProdVO>;
          
    },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
  
  
  }

  increment() {
    this.counter += 1;
    
   
  }

  decrement() {
    this.counter -= 1;
  }


  save(){

  this.producto.usuario = this._authService.payload.user_name;
  this.producto.cantidadMov = this.counter;
this.producto.tpoMov = this.productForm.value.tmpId;
  this.productoService.saveHstProd(this.producto).subscribe(
    correcto =>  this.router.navigate([ 'products/physical/movimiento-insumo']),
   error => {
     console.error("Usuario o contraseña invalidos");
   } );
  



}

}
