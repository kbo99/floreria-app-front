import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';
import { Imagen } from 'src/app/shared/model/Imagen/Imagen';
import { Cosnt } from 'src/app/shared/utils/Const';
import { Router } from '@angular/router';
import { TipoProductoVO } from 'src/app/shared/model/Producto/TipoProductoVO';
import { TpoMovProdVO } from 'src/app/shared/model/Producto/TpoMovProdVO';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-add-insumo-prod',
  templateUrl: './add-insumo-prod.component.html',
  styleUrls: ['./add-insumo-prod.component.scss']
})
export class AddInsumoProdComponent implements OnInit {
  public productForm: FormGroup;
  public counter2: number = 0;
  public counter: number = 1;
  public producto: ProductoVO;
  public lstImg: Imagen[] = new Array();
  prodTmp: string;
  currVerifiedLoanOfficerPhoto;
  public lstProdTmp: ProductoVO[] = new Array();
  lstTpoProd:TipoProductoVO [] = new Array();
  tipoProducto: TipoProductoVO = new TipoProductoVO();
  lstTpoMo:TpoMovProdVO [] = new Array();
  source : LocalDataSource;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  productoParent: ProductoVO;
  public url = [{
    img: "assets/images/user.png",
  },
  ]


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
      prodCostoCompra: {
        title: 'Precio',
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


  constructor(private fb: FormBuilder,
    private _sanitizer: DomSanitizer, private productoService:ProductoService, 
    private router: Router, private authService: AuthService) {
      this.prodTmp  = sessionStorage.getItem(Cosnt.INS_CONFIG);
      if(this.prodTmp !== null){
        this.productoParent = JSON.parse(this.prodTmp) as ProductoVO;
        sessionStorage.removeItem(Cosnt.INS_CONFIG);
        this.productForm = this.fb.group({
          prodId: [''],
          prodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodCostoCompra: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodClave: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          tpoprodId: [''],
          prodExistenciaMin: [''],
          tmpId: [''],
          requerido: ['2']
        });
      }else {
        this.router.navigate([ 'products/physical/add-product'])
      }

       
      
      
   
  }

  

  ngOnInit(): void {
    this. findLstProd();
    this.findLstMov();
  }

  increment() {
    this.counter  += 1;
  }

  decrement() {
    this.counter  -= 1;
  }

  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if(i >= this.lstImg.length){
        let img:Imagen = new Imagen();
        img.imgUrl = reader.result.toString();
        this.lstImg.push(img);
      }else {
        this.lstImg[i].imgUrl = reader.result.toString();
      }
     this.url[i].img = reader.result.toString();
     this.currVerifiedLoanOfficerPhoto = reader.result.toString();
    }
  }

  save(){
   
    this.producto = this.productForm.value;
    this.producto.cantidadMov = this.counter;
    if(this.productoParent.lstProdHijo === undefined || 
      this.productoParent.lstProdHijo === null || this.productoParent.lstProdHijo.length === 0){
        this.productoParent.lstProdHijo = new Array();
      }
      this.productoParent.lstProdHijo.push(this.producto);
  this.regresar();
  
  
  }

  regresar(){
    sessionStorage.setItem(Cosnt.PROD_ADD_IN,JSON.stringify(this.productoParent));
    this.router.navigate([ 'products/physical/add-product']);
  }
  findLstProd(){
    const _this = this;
    //Obtemos los insumos de la tabla productos, con estatus ACTIVO (AC) y especificamos que el producto es un insumo (true)
    this.productoService.getProdByestatus('AC', true).subscribe(
      correcto => {
        this.lstProdTmp = correcto as Array<ProductoVO>;
    
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
  findLstMov(){
    this.productoService.getTpoMovByestatus().subscribe(
      correcto => {
        this.lstTpoMo = correcto as Array<TpoMovProdVO>;
          
    },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
  
  
  }

  onUserRowSelect(event) { 
    this.productForm.reset();
   this.counter = 1;
   this.producto = event.data as ProductoVO;
   sessionStorage.removeItem(Cosnt.INS_CONFIG);
   if(this.producto.lstImg !== undefined && this.producto.lstImg.length > 0){
     this.url[0].img = (this._sanitizer.bypassSecurityTrustResourceUrl(this.producto.lstImg[0].imgUrl) as any).
     changingThisBreaksApplicationSecurity;
     this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.producto.lstImg[0].imgUrl) as any).
     changingThisBreaksApplicationSecurity;
   }else {
     this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.url[0].img) as any).
     changingThisBreaksApplicationSecurity;
   }
  
   if(this.producto.tipoProducto === undefined || this.producto.tipoProducto === null){
     this.producto.tipoProducto = new TipoProductoVO();
     this.producto.tipoProducto.tpoprodId = 0;
   }
 
   this.productForm = this.fb.group({
     prodId: [this.producto.prodId],
     prodNombre: [this.producto.prodNombre, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
     prodCostoCompra: [this.producto.prodCostoCompra, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
     prodClave: [this.producto.prodClave, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
     tpoprodId: [this.producto.tipoProducto.tpoprodId],
     prodExistenciaMin: [this.producto.prodExistenciaMin],
     tmpId: [''],
     requerido: ['2']
   });
} 
  

}
