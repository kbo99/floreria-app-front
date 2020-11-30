import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NombrePersonaPipe } from 'src/app/pipes/NombrePersonaPipe';
import { Persona } from 'src/app/shared/model/Persona/Persona';
import { PersonaService } from 'src/app/shared/service/persona/persona.service';

@Component({
  selector: 'app-busca-cliente',
  templateUrl: './busca-cliente.component.html',
  styleUrls: ['./busca-cliente.component.scss']
})
export class BuscaClienteComponent implements OnInit {

  public idForm: FormGroup;
  public nombresForm: FormGroup;
  public rfcForm: FormGroup;

  public personas: Persona[] = [];

  constructor( private formBuilder: FormBuilder, 
    private router: Router,
    private _personaService: PersonaService
    ) { }

  ngOnInit(): void {
    this.createIdForm();
    this.createRfcForm();
    this.createNombresForm();
  }


  createIdForm() {
    this.idForm = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  createNombresForm() {
    this.nombresForm = this.formBuilder.group({
      nombre: [''],
      apePater: ['']
    })
  }

  createRfcForm() {
    this.rfcForm = this.formBuilder.group({
      rfc: ['', Validators.required]
    })
  }

  onSubmitRfc() {
    var rfc: string = this.rfcForm.get('rfc').value;
    this._personaService.findPerByRfc(rfc).subscribe(item => {
      this.personas = item;
      console.log("Item: ", item);
      
    } );
  }

  onSubmitId() {
    var id: number = this.idForm.get('id').value;
    this._personaService.findPerById(id).subscribe(item => {
      this.personas = [];
      this.personas.push(item);
      console.log("Item: ", item);
    } );
  }
  onSubmitNombre() {
    var perNombre: string = this.nombresForm.get('nombre').value;
    var apePater: string = this.nombresForm.get('apePater').value;
    this._personaService.findPerByNombre(perNombre,apePater).subscribe(item => {
      this.personas = item;
      console.log("Item: ", item);
    } );
  }


  public settings = {
    mode: 'external',
    actions: {
      id: 'accions',
      columnTitle: 'Accion',
      add: false,
      edit: false,
      delete: false,
      // custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye">PPP</i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ]
    },
    columns: {
      perId: {
        title: 'ID',
        type: 'string',
        filter: false
      },
      perNombre: {
        title: 'Nombre',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => {
         return new NombrePersonaPipe().transform(row)
         }
      },
    }
    
  };

}
