import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public registerUser:RegisterUsuario;

  public const: Cosnt;

  constructor(private formBuilder: FormBuilder, _usuarioService: UsuarioService) {

    this.registerUser = new RegisterUsuario();


  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: [this.registerUser.persona.perNombre, Validators.required],
      lname: [this.registerUser.persona.perApePate, Validators.required],
      email: [this.registerUser.persona.perEmail, Validators.required],
      password: ["", Validators.required],
      confirmPwd: ['', Validators.required]
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  ngOnInit() {
    this.createAccountForm();
    this.createPermissionForm();
  }

addGroup(grupo:String):void {
  //console.log("Agregando grupo: ", grupo);
  
}

removeGroup(grupo:String):void {
  //console.log("Removiendo grupo: ", grupo);
}

}
