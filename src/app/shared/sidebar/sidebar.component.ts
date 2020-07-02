import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/service/services.index';
import { PayLoad } from 'src/app/commons/model/PayLoad';
import { MenuService } from 'src/app/service/menu/menu.service';
import { Menu } from 'src/app/commons/model/menu/Menu';
import { SubMenu } from 'src/app/commons/model/menu/SubMenu';
declare function init_plugins();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewInit {
  _payload: PayLoad; 
  _menu: Menu[] = [];

  contentPrinted = 0;
  constructor(private _authService: AuthService,
    private _menuService: MenuService,
    private cdRef:ChangeDetectorRef) {
    this._payload = this._authService.payload;
  }
 
  ngAfterViewInit(): void {
    this.contentPrinted = 0;
    let menut: Menu[] = this._menuService.getmenu();
    if (menut != null) {
      this._menu = menut;
      this.cdRef.detectChanges();
    } else {
      this._menuService.cargarMenu().subscribe(item => {
          this._menu = item;
          this.cdRef.detectChanges();
        });
    }
  }

  ngOnInit() {
    
  }
  logout() {
    this._authService.logout();
  }

  onContentPrinted() {
   // console.log("for");
    this.contentPrinted ++;
    init_plugins();
  }

  validateClassAcc(sub:SubMenu[]): boolean {
   // console.log("sub: ", sub);
    return sub != null && sub.length > 0;
  }

  getRouter(sub:SubMenu): boolean {
   // console.log("sub: ", sub);
   // console.log("Ruta" + sub.smeNombre + ": ", sub.smeURL);
    return sub.smeURL != null && sub.smeURL.length > 0;
  }

  
}

