import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colonia } from 'src/app/shared/model/Persona/Colonia';
import { Direccion } from 'src/app/shared/model/Persona/Direccion';
import { Entidad } from 'src/app/shared/model/Persona/Entidad';
import { Municipio } from 'src/app/shared/model/Persona/Municipio';
import { DireccionService } from 'src/app/shared/service/persona/direccion.service';
import { Persona } from 'src/app/shared/model/Persona/Persona';
import { Origen } from 'src/app/shared/model/utils/Origen';
import { Cosnt } from 'src/app/shared/utils/Const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-direccion',
  templateUrl: './cliente-direccion.component.html',
  styleUrls: ['./cliente-direccion.component.scss']
})
export class ClienteDireccionComponent implements OnInit {

  direccion: Direccion = new Direccion();
  colonias: Colonia[] = [];
  entidades: Entidad[] = [];
  municipios: Municipio[] = [];
  public dirForm: FormGroup;
  title: string = ""
  persona: Persona;
  origen: Origen[] = [];
  isAlta: boolean;
 
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private _direccionService: DireccionService
  ) { }

  ngOnInit(): void {

    var perStr:string  = sessionStorage.getItem(Cosnt.PERSONA_EDIT);
      sessionStorage.removeItem(Cosnt.PERSONA_EDIT);
      if(perStr !== null){
        this.persona = JSON.parse(perStr);
       }else {
        this.persona = new Persona();
      }

      var dirStr:string  = sessionStorage.getItem(Cosnt.DIRECCION_EDIT);
      sessionStorage.removeItem(Cosnt.DIRECCION_EDIT);
      if(dirStr !== null){
        this.direccion = JSON.parse(dirStr);
        this.title = "Editar Direccion";
        this.isAlta = false;
       }else {
        this.title = "Agregar Direccion"
        this.direccion = new Direccion();
        this.isAlta = true;
      }
      this.direccion.persona = this.persona;

      var pathStr = sessionStorage.getItem(Cosnt.PATH_ORIGEN);
      sessionStorage.removeItem(Cosnt.PATH_ORIGEN);
      if(pathStr !== null) {
        this.origen = JSON.parse(pathStr);
        //console.log("Get Origen: ", this.origen);
      }


    this._direccionService.findByEntidadId(1).subscribe(item => {
      this.entidades = item;
     if (this.direccion.colonia.municipio.entidad.entId > 0) {
       this.callMunicipio(this.direccion.colonia.municipio.entidad.entId);
      }
    } );
    this.createFormDir();
  }

  createFormDir() {
    this.dirForm = this.formBuilder.group({
      colId: [this.direccion.colonia.colId, Validators.required],
      munId: [this.direccion.colonia.municipio.munId, Validators.required],
      entId: [this.direccion.colonia.municipio.entidad.entId, Validators.required],
      colCp: [this.direccion.colonia.colCp],
      dirCalle: [this.direccion.dirCalle, Validators.required],
      dirNumExt: [this.direccion.dirNumExt, Validators.required],
      dirNumInt: [this.direccion.dirNumInt]
    })
  }

  callMunicipio(entId) {
    this._direccionService.finMunByEntId(entId).subscribe(item => {
      this.municipios = item;
      if (this.direccion.colonia.municipio.munId > 0) {
        this.callColonia(this.direccion.colonia.municipio.munId);
      }
    } );
  }

  callColonia(munId) {
    this._direccionService.findColByMunId(munId).subscribe(item => {
      this.colonias = item;
    } );
  }

  setColonia(colId) {
    this.colonias.forEach(item => {
      if(item.colId == colId) this.direccion.colonia = item;
    })
    //console.log("Colonia: ",this.direccion.colonia);
  }

  onSubmit() {
    if (this.persona.perId > 0) {
     // console.log("Guardando Direccion", this.direccion);
      
      this._direccionService.saveDireccion(this.direccion).subscribe(
        item => {
          this.direccion = item;
          this.goOrigen();
        },
        error => console.error("Error al guardar Direccion", error)
      );
    } else {
      //console.log("Regresando Direccion", this.direccion);
      this.goOrigen();
    }
  }

  goOrigen() {
    
    let nav: Origen = this.origen[this.origen.length -1];
        this.origen.pop();
        this.direccion.persona = new Persona();
        if (this.isAlta) {
          this.persona.direccions.push(this.direccion);
        } else {
          var index: number = 0;
          for (let item of this.persona.direccions) {
            if (item.dirId === this.direccion.dirId) {
              break;
            }
            index ++;
          }
          this.persona.direccions[index] = this.direccion;
        }
       // console.log("Persona: ", this.persona);
        sessionStorage.setItem(Cosnt.PERSONA_EDIT, JSON.stringify(this.persona));
        this.router.navigate([nav.path]);
  }

}
