import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { of, from  } from 'rxjs'; 
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { UserResponse } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Servicio para la autentificacion
  //Trabajar con BehaviourSubjects
  public loggedIn = new BehaviorSubject<boolean>(false);

  usuarioRegistrado: any[] = [];
  idUsuario:number =0;
  API: string = 'http://localhost/pluma/';

  constructor(private router: Router, private clienteHttp: HttpClient) {
  }

  loginBS(data: any): Observable<any> {
    const url = `${this.API}ser_login.php`;
    const formData = new FormData();
    formData.append('nomUser', data.email);
    formData.append('pass', data.password);
  
    return this.clienteHttp.post<any>(url, formData).pipe(
      map(user => {
        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de error HTTP
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }


logoutBS(): void {
  localStorage.setItem('loggedIn', 'false'); 
  this.clearCurrentUser();
  this.router.navigate(['login'], { replaceUrl: true });
}

clearCurrentUser(): void {
  localStorage.removeItem('codeqr');
  localStorage.removeItem('id_org_update');
}

isLoggedInBS(): boolean {
  return this.loggedIn.getValue();
}


//servicios pantallas organizacion
mostrarOrganizacion() {
  let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  return this.clienteHttp.post(this.API + 'ser_mostrar_organizaciones.php', { headers });
}
LovTipoUsers(seleccionado: String) {
  let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let params = 'seleccionado=' + seleccionado;
  return this.clienteHttp.post(this.API + 'se_LOV_tipo_user.php', params, { headers });
}
insertar_org(nombre_organizacion: any, id_tipo_organizacion: any) {
  let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let params = 'nombre_org=' + nombre_organizacion + '&fk_id_tipo_org=' + id_tipo_organizacion;
  return this.clienteHttp.post(this.API + 'ser_insertar_organizacion.php', params, { headers });
}
mostrarOrganizacionForID(id_organizacion: any) {
  let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let params = 'id_organizacion=' + id_organizacion;
  return this.clienteHttp.post(this.API + 'ser_mos_org_for_ID.php', params, { headers });
}
actualizar_organizacion(id_organizacion: any, nombre_organizacion: any, id_tipo_organizacion: any) {
  let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let params = 'idOrg=' + id_organizacion + '&nombre=' + nombre_organizacion + '&fktipoOrg=' + id_tipo_organizacion;
  return this.clienteHttp.post(this.API + 'ser_update_organizacion.php', params, { headers });
}


}
