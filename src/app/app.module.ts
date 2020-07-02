import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule }   from '@angular/forms';

// Rutas
import { APP_ROUTERS } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// paguinas 
import { LoginComponent } from './login/login.component';

// servicios
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    ServiceModule,
    APP_ROUTERS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
