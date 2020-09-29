
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';
import { Cosnt } from '../../utils/Const';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { from } from 'rxjs';

import 'rxjs/add/operator/map';

//import { throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Interceptor requ");
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
        const URL = Cosnt.URL_SERVICIOS + request.url;
        const token = await this._authService.token;
        let changedRequest = request;
        // HttpHeader objecto immutable - copy values
        let newHeader = new HttpHeaders();
        const headerSettings: {[name: string]: string | string[]; } = {};
        for (const key of request.headers.keys()) {
          headerSettings[key] = request.headers.getAll(key);
          newHeader.append(key,request.headers.getAll(key) );
        }
        
       // request.url.indexOf("oauth/token")
       
        if (token) {
            const authReq = request.clone({
              url: URL,
              headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(authReq)
            .map(res => this.responseBuilt(res))  // manejo de respuestas
            .catch((e) => (this.errorHandled(e))) // manejo de errores
            .toPromise();
        } 
         
        newHeader = new HttpHeaders(headerSettings);
        
        //newHeader.append("1","2");

        //console.log("headerSettings:" + JSON.stringify(headerSettings));
        changedRequest = request.clone({
          url: URL});
          //console.log("changedRequest" + JSON.stringify(changedRequest));
        return next.handle(changedRequest)
        .map(res => this.responseBuilt(res))  // manejo de respuestas
        .catch((e) => (this.errorHandled(e))) // manejo de errores
        .toPromise();
  }

  /**
   * Maneja la respuesta de cada peticion al back
   * si el back responde un mensaje lo pinta con el titulo mensaje e icono enviado
   * @param res 
   */
  private async responseBuilt(res: any) {
    //console.log("Response ", res)
    if (res instanceof HttpResponse) {
        if (res.body['response']) {
          //console.log("result body interceptor:", res.body); 
          if (res.body['message'] && res.body['message'].length > 0) {
           Swal.fire({
            title: this.nullToString(res.body['title']),
            text: this.nullToString(res.body['message']), 
            icon: 'success'});
          } 
         return  res.clone({
          body: res.body.response,
          headers: res.headers,
          status:  res.status,
          statusText: res.statusText,
          url: res.url
        });; 
      }
      return res;
   } else {
    //console.log("Response ", res)
     return res;
   }
  }

  /**
   * Manejo de errores que devuelve el back 
   * si responde un mensaje de error este lo pinta con el titulo mensaje e icono enviado
   * @param e 
   */
  private async errorHandled (e: any) {
      if (e instanceof HttpErrorResponse) {
        console.error('Error ::::    Status: ' + e.status);
        console.error(e);
          if (e.status === 403 || e.status === 401) {
            // this.router.navigate(['login']);
            Swal.fire("No autorizado ", " ", "warning");
            return e;
          } 
          console.log("error:", e.error['msError']);
          if (e.error['msError']) {
          // && e.error['error'].indexof("invalid_grant") < 0
            Swal.fire({title:this.nullToString(e.error.title), 
              text:this.nullToString(e.error.msError), 
              icon: 'error'});
          }
        } 
      return e;
  }
  
/**
 * Devuelve String vacio si va null o el string sin espacios que se le envie
 * @param value 
 */
  private nullToString(value: string) : string {
    var result: string = '';
    if (value && value.length > 0) result = value.trim();
    return result;
  
  }


}
