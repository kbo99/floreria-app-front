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

@Component({
  selector: 'app-sub-category-detail',
  templateUrl: './sub-category-detail.component.html',
  styleUrls: ['./sub-category-detail.component.scss']
})
export class SubCategoryDetailComponent implements OnInit {
  public productForm: FormGroup;
  public counter2: number = 0;
  public counter: number = 1;
  public producto: ProductoVO;
  public lstImg: Imagen[] = new Array();
  prodTmp: string;
  currVerifiedLoanOfficerPhoto;
  lstTpoProd:TipoProductoVO [] = new Array();
  tipoProducto: TipoProductoVO = new TipoProductoVO();
  lstTpoMo:TpoMovProdVO [] = new Array();
  public urlImagen : string;
  public url = [{
    img: "assets/images/user.png",
  },
  ]

  constructor(private fb: FormBuilder,
    private _sanitizer: DomSanitizer, private productoService:ProductoService, 
    private router: Router, private authService: AuthService) {      
      this.prodTmp  = sessionStorage.getItem(Cosnt.INS_CONFIG);
      if(this.prodTmp !== null){
        this.counter = 0;
        this.producto = JSON.parse(this.prodTmp) as ProductoVO;
        
        if(this.producto.lstImg && this.producto.lstImg !== undefined && this.producto.lstImg.length > 0){

          //A la url de la imagen almacenada en BD se le concatena la direccion de amazon s3
          this.urlImagen = Cosnt.amazon_s3_endpoint + this.producto.lstImg[0].imgUrl;

          this.url[0].img = (this._sanitizer.bypassSecurityTrustResourceUrl(this.urlImagen) as any).
          changingThisBreaksApplicationSecurity;
          this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.urlImagen) as any).
          changingThisBreaksApplicationSecurity;
        }else {
          this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.url[0].img) as any).
          changingThisBreaksApplicationSecurity;
        }
        
        if(this.producto.tipoProducto === undefined || this.producto.tipoProducto === null){
          this.producto.tipoProducto = new TipoProductoVO();
          this.producto.tipoProducto.tpoprodId = 0;
        }
        this.counter= 0;
        this.productForm = this.fb.group({
          prodId: [this.producto.prodId],
          prodNombre: [this.producto.prodNombre, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodCostoCompra: [this.producto.prodCostoCompra, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodClave: [this.producto.prodClave, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          tpoprodId: [this.producto.tipoProducto.tpoprodId],
          prodExistenciaMin: [this.producto.prodExistenciaMin],
          tmpId: [''],
        });

        sessionStorage.removeItem(Cosnt.INS_CONFIG);
      }else {
        this.router.navigate([ 'products/physical/sub-category']);
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
    if (this.counter > 0) {
      this.counter  -= 1;
    }
  }

  onChangeEvent_CantMov(event: any){
    this.counter = event.target.value;
  }

  onlyNumberKey(event) { 
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57; 
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
    this.producto = new ProductoVO();
    this.producto = this.productForm.value;
    this.producto.cantidadMov = this.counter;
    this.producto.tpoMov = this.productForm.value.tmpId;
    this.producto.lstImg = this.lstImg;
    this.producto.prodEstatus = 'AC';
    this.producto.prodEsInsumo = true;
    this.producto.tipoProducto = new TipoProductoVO();
    this.producto.tipoProducto.tpoprodId = this.productForm.value.tpoprodId;
    this.producto.usuario = this.authService.payload.user_name;
    this.productoService.saveProd(this.producto).subscribe(
      correcto =>  this.router.navigate([ 'products/physical/sub-category']),
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
  
  
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

  return(){
    console.log("Regresa a Insumo");
    this.router.navigate([ 'products/physical/sub-category']);
  }
}
