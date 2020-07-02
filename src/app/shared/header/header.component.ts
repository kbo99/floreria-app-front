import { Component, OnInit } from '@angular/core';
import { UsuarioService, AuthService } from '../../service/services.index';
import { PayLoad } from 'src/app/commons/model/PayLoad';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  _payload: PayLoad;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._payload = this._authService.payload;
  }

  logout(): void {
    this._authService.logout();
  }

}
