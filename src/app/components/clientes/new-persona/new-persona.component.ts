import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/shared/model/Persona/Persona';
import { Origen } from 'src/app/shared/model/utils/Origen';
import { Cosnt } from 'src/app/shared/utils/Const';
import { PersonaService } from 'src/app/shared/service/persona/persona.service';
import { DireccionPipe } from 'src/app/pipes/direccion.pipe';

@Component({
  selector: 'app-new-persona',
  templateUrl: './new-persona.component.html',
  styleUrls: ['./new-persona.component.scss']
})
export class NewPersonaComponent implements OnInit {

  origen: Origen[] = [];
  title: string = ""
  persona: Persona = new Persona();
  public personatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
     private router: Router,
     private _personaService:PersonaService) { }

  ngOnInit(): void {

    var perStr:string  = sessionStorage.getItem(Cosnt.PERSONA_EDIT);
      sessionStorage.removeItem(Cosnt.PERSONA_EDIT);
      if(perStr !== null){
        this.persona = JSON.parse(perStr);
       }else {
        this.persona = new Persona();
      }
      var pathStr = sessionStorage.getItem(Cosnt.PATH_ORIGEN);
      sessionStorage.removeItem(Cosnt.PATH_ORIGEN);
      if(pathStr !== null){
        this.origen = JSON.parse(pathStr);
      }

      this.title = this.persona.perId == 0 ? "Nuevo Cliente": "Editar Cliente";
      this.createFormPersona();
  }

  createFormPersona() {
    this.personatForm = this.formBuilder.group({
      perNombre: [this.persona.perNombre, Validators.required],
      perApePate: [this.persona.perApePate, Validators.required],
      perApeMat: [this.persona.perApeMat],
      perEmail: [this.persona.perEmail, [Validators.required, Validators.email]],
      perRfc: [this.persona.perRfc, Validators.required]
    })
  }

  onSubmit() {
    //console.log("Persona: ", this.persona);
    this._personaService.savePersona(this.persona).subscribe(
      item => {
       // this.persona = item;
       if (this.origen.length > 0) {
        let nav: Origen = this.origen[this.origen.length -1];
        this.origen.pop();
        this.setOrigen(false);
        this.setPersona();
        this.router.navigate([nav.path]);
       } else {
         this.persona = new Persona();
          this.ngOnInit();
       }
      },
      error => console.error("Error al guardar Persona", error));
  }

  addDireccion() {
    //console.log("Add: " );
    this.setPersona();
    this.setOrigen(true);
    this.router.navigate(['/clientes/cliente-direccion']);
  }

  onEditDireccion(event) {
    //console.log("Editar: ", event.data );
    sessionStorage.setItem(Cosnt.DIRECCION_EDIT, JSON.stringify(event.data));
    this.setPersona();
    this.setOrigen(true);
    this.router.navigate(['/clientes/cliente-direccion']);
  }

  private setPersona() {
    sessionStorage.setItem(Cosnt.PERSONA_EDIT, JSON.stringify(this.persona));
  }

  private setOrigen(add: boolean) {
    if (add) this.origen.push(new Origen("/clientes/new-persona"));
    sessionStorage.setItem(Cosnt.PATH_ORIGEN, JSON.stringify(this.origen));
    //console.log("Set Origen: ", this.origen);
    
  }

  public settings = {
    mode: 'external',
    actions: {
      id: 'accions',
      columnTitle: 'Accion',
      add: false,
      edit: true,
      delete: true,
      // custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye">PPP</i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ]
    },
    columns: {
      dirId: {
        title: 'Direccion',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => {
         return new DireccionPipe().transform(row)
         }
      },
    }
    
  };

}
