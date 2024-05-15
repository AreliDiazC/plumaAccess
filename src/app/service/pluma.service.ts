import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class plumaService {

API: string = 'http://localhost/pluma/';

constructor(private clienteHttp: HttpClient) {
}

verOrganizacion(): Observable<any>{
    return this.clienteHttp.get(this.API+"ser_mostrar_organizaciones.php");
}


verPlumas(): Observable<any>{
    return this.clienteHttp.get(this.API+"sp_mostrar_todas_plumas.php");
}

mostrarPlumas(datos:any): Observable<any>{
    const formData = new FormData();
    formData.append('id_organizacion', datos.organizacion);
    return this.clienteHttp.post(this.API+"ser_mostrar_plumas.php", formData);
}

mostrarPlumasId(datos:any): Observable<any>{
    const formData = new FormData();
    formData.append('id_organizacion', datos);
    
    return this.clienteHttp.post(this.API+"ser_mos_plumas_for_ID.php", formData);
}

agregarPluma(datos: any): Observable<any> {
    const formData = new FormData();
    formData.append('p_cod_pluma', datos.codigo);
    formData.append('p_fk_id_org', datos.organizacion);
    return this.clienteHttp.post<any>(this.API + "sp_insert_pluma.php", formData);
  }

  actualizarPluma(datos: any): Observable<any> {
    const formData = new FormData();
    formData.append('p_id_pluma', datos.p_id_pluma);
    formData.append('p_codigo_pluma', datos.codigo);
    formData.append('p_fk_id_organizacion', datos.organizacion);
    return this.clienteHttp.post<any>(this.API + "sp_update_pluma.php", formData);
}
}
