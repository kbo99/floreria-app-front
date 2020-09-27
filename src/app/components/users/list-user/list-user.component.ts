import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuarios/usuario-service';
import { userListDB } from 'src/app/shared/tables/list-users';
import { Cosnt } from 'src/app/shared/utils/Const';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []

  constructor(private _usuarioService: UsuarioService, private router: Router) {
    _usuarioService.findAll().subscribe(item => {
      this.user_list = item;
      console.log(item)
    } );
  }

  public settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Accion',
      add: false,
      edit: true,
      delete: false,
      position: 'right',
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye">PPP</i>'},
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ]
    },
   
    columns: {
      // avatar: {
      //   title: 'Avatar',
      //   type: 'html'
      // },
      usuUsuario: {
        title: 'Email'
      },
      persona: {
        title: 'Nombre',
        type:'text',
        valuePrepareFunction:(persona)=>{
          var nombre: string= "";
          nombre = persona.perNombre != null ? persona.perNombre : "";
          nombre = persona.perApePate != null ? nombre + " " + persona.perApePate : nombre;
          nombre = persona.perApeMat != null ? nombre + " " + persona.perApeMat : nombre;
          return nombre; 
        }
      },
      // last_login: {
      //   title: 'Last Login'
      // },
      usuEstatus: {
        title: 'Estatus'
      },
    }
    
  };

  onEdit(event) {
    console.log("Editar: ", event.data )
    sessionStorage.setItem(Cosnt.USUARIO_EDIT, JSON.stringify(event.data));
    this.router.navigate(['/users/edit-user']);
  }

  ngOnInit() {
  }

}

