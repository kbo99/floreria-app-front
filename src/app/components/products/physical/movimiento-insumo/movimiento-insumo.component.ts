import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import { LocalDataSource } from 'ng2-smart-table';
import { Cosnt } from 'src/app/shared/utils/Const';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TipoProductoVO } from 'src/app/shared/model/Producto/TipoProductoVO';
import { TpoMovProdVO } from 'src/app/shared/model/Producto/TpoMovProdVO';
import Swal from 'sweetalert2';
import {RequestPerson}  from 'src/app/shared/model/Request/RequestPerson';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-movimiento-insumo',
  templateUrl: './movimiento-insumo.component.html',
  styleUrls: ['./movimiento-insumo.component.scss']
})
export class MovimientoInsumoComponent implements OnInit {
  public generalForm: FormGroup;

  minDate: Date;
  maxDate: Date;
  public date: Date;

  source : LocalDataSource;
  public dataFilter: RequestPerson;
  public settings = {
    actions: false,
    columns: {
      
      prodNombre: {
        title: 'Nombre',
        editable: false,
      },
      tpoMovimiento: {
        title: 'Tipo Movimiento',
        editable: false,
      },
      hpsCantAnterior: {
        title: 'Cantidad Anterior',
        editable: false,
      },
      hpsCantidadMovimiento: {
        title: 'Cantidad Movimiento',
        editable: false,
      },
      prodExistenciaActual: {
        title: 'Existencia',
        editable: false,
        
      },
      usuario: {
        title: 'Usuario',
        editable: false,
        
      },
      hpsFecha: {
        title: 'Fecha',
        editable: false,
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      },
      
    },
  };

  lastClickTime: number = 0;
  lstTpoProd:TipoProductoVO [] = new Array();
  tipoProducto: TipoProductoVO = new TipoProductoVO();
  lstTpoMo:TpoMovProdVO [] = new Array();
  constructor(private _sanitizer: DomSanitizer, private productoService:ProductoService, 
    private router: Router, public _authService: AuthService,
    private formBuilder: FormBuilder, private calendar: NgbCalendar,  private datePipe: DatePipe) {
      this.createGeneralForm();
      const currentYear = new Date().getFullYear();
      
  this.minDate = new Date(currentYear, new Date().getMonth(), new Date().getDay()- 1);
  this.maxDate = new Date();
    }

  ngOnInit(): void {
    this.findLstMov();
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

 



createGeneralForm() {
  this.generalForm = this.formBuilder.group({
    fechaIni: [(new Date()).toISOString(),Validators.required],
    fechaFin: [(new Date()).toISOString(),Validators.required],
    prodNombre: [''],
    tmpId: [''],
  });
  this.find();
}

findTpoLstProd(){
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

find(){

      if(!this.generalForm.valid){
        
        Swal.fire({
          title: 'Aviso',
          text: 'Fechas Incorrectas \n',
        });

        return;
      }else {
        
        this.dataFilter = this.generalForm.value;
        this.dataFilter.extraParamMap = {};
        this.dataFilter.extraParamMap["nombre"] = this.generalForm.value.prodNombre;
        this.dataFilter.extraParamMap["tpomov"]  = +this.generalForm.value.tmpId;
     
        this.productoService.findByParams(this.dataFilter).subscribe(
          correcto => {
            this.source = new LocalDataSource(correcto ) 
        },
         error => {
           console.error("Usuario o contraseña invalidos");
         } );
      }
}

reset(){
  this.generalForm.reset();
  this.createGeneralForm();
}

}
