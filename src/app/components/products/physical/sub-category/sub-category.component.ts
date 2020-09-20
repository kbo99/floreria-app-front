import { Component, OnInit } from '@angular/core';
import { categoryDB } from 'src/app/shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoVO } from '../../../../shared/model/Producto/ProductoVO';
import { Imagen } from '../../../../shared/model/Imagen/Imagen';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';

import { ProductoService} from '../../../../shared/service/producto/producto.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  public closeResult: string;
  public sub_categories = []
  public productForm: FormGroup;
  public counter: number = 1;
  public producto: ProductoVO;
  public lstImg: Imagen[] = new Array();
  public lstProd: ProductoVO[] = new Array();
  public lstProdTmp: ProductoVO[] = new Array();
  source : LocalDataSource;
  public url = [{
    img: "assets/images/user.png",
  },
  ]

  constructor(private modalService: NgbModal, private reference: NgbModal,private fb: FormBuilder,
    private _sanitizer: DomSanitizer, private productoService:ProductoService) {
    this.productForm = this.fb.group({
      prodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodCostoCompra: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodCostoVenta: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodClave: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      size: ['', Validators.required],
    });
   
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onRowSelect(event) { 
    console.log(event); 
} 

onUserRowSelect(event) { 
    console.log(event); 
} 

  public settings = {
    actions: false,
    selectMode: 'multi',
    columns: {
      img: {
        title: 'Image',
        type: 'html',
        editable: false,
        filter: false
      },
      prodNombre: {
        title: 'Nombre',
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
      status: {
        title: 'Estatus',
        type: 'html',
        editable: false,
        filter: false
      },
      
    },
  };

  
  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
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
        img.imgId = 0;
        img.imgUrl = reader.result.toString();
        this.lstImg.push(img);
      }else {
        this.lstImg[i].imgUrl = reader.result.toString();
      }
     this.url[i].img = reader.result.toString();
    }
  }

  ngOnInit() {
   this.findLstProd();
  }
save(){
  this.producto = this.productForm.value;
  this.producto.prodExistenciaMin = this.counter;
  this.producto.lstImg = this.lstImg;
  this.producto.prodEstatus = 'AC';
  this.productoService.saveProd(this.producto).subscribe(
    correcto => window.location.reload(),
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}
 
findLstProd(){
  const _this = this;
  this.productoService.getProdByestatus('AC').subscribe(
    correcto => {
      this.lstProdTmp = correcto as Array<ProductoVO>;
        this.lstProdTmp.forEach(function(value) {
         
          if(value.imgDefault !== null && value.imgDefault.length > 0){
            value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
            changingThisBreaksApplicationSecurity
            +"' class='imgTable'>"
          }
    });
    this.source = new LocalDataSource(this.lstProdTmp)
  },
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}


}
