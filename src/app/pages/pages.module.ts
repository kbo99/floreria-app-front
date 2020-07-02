import { NgModule } from "@angular/core";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

// Modulos
import { SharedModule } from "../shared/shared.module";

// Routes
import { PAGES_ROUTERS } from "./pages.routes";

/** Page */
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GruposComponent } from './seguridad/grupos/grupos.component';
import { NotFound404Component } from './seguridad/not-found404/not-found404.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GruposComponent,
    NotFound404Component

  ],
  entryComponents: [],
  exports: [],
  imports: [
    BrowserModule,
    PAGES_ROUTERS,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule {}
