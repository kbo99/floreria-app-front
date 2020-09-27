import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/shared/model/Persona/Persona';
import { Grupo } from 'src/app/shared/model/usuario/Grupo';
import { Usuario } from 'src/app/shared/model/usuario/Usuario';
import { Cosnt } from 'src/app/shared/utils/Const';
import { RegisterUsuario } from '../../../shared/model/usuario/RegisterUsuario'
import { UsuarioService } from '../../../shared/service/usuarios/usuario-service'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  public usuario:Usuario;
  public groups: Grupo[] = [];

  submitted: boolean = true;
  constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService) {

    _usuarioService.findAllGrupos().subscribe(item => {
      this.groups = item;
      //.log(item)
    } );
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      perNombre: [this.usuario.persona.perNombre, Validators.required],
      perApePate: [this.usuario.persona.perApePate, Validators.required],
      perApeMate: [this.usuario.persona.perApeMat, Validators.required],
      perEmail: [this.usuario.persona.perEmail, [Validators.required, Validators.email]],
      password: [this.usuario.usuUsuario, Validators.required],
      confirmPwd: ['', Validators.required]
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.persona = new Persona()
    this.createAccountForm();
    this.createPermissionForm();
  }

addGroup(grupo:String):void {
  //console.log("Agregando grupo: ", grupo);
  this.groups.forEach(item=> {if (item.grpNombre === grupo) this.usuario.addGroup(item)});
}

removeGroup(grupo:String):void {
  //.log("Removiendo grupo: ", grupo);
  this.groups.forEach(item=> {if (item.grpNombre === grupo) this.usuario.removeGroup(item)});
}

onSubmit() {
  // console.log("submit: ", this.accountForm.value);

  this.usuario.usuPassword = this.accountForm.get('password').value
  this.usuario.persona.perNombre =  this.accountForm.get('perNombre').value
  this.usuario.persona.perApePate =  this.accountForm.get('perApePate').value
  this.usuario.persona.perApeMat =  this.accountForm.get('perApeMate').value
  this.usuario.persona.perEmail =  this.accountForm.get('perEmail').value
  this.usuario.usuUsuario =  this.accountForm.get('perEmail').value

  this._usuarioService.generateUserN(this.usuario).subscribe(
          correcto => this.ngOnInit(),
          error => console.error("Error al guardar Usuario", error));
}

get f() { return this.accountForm.controls; } 
}
