import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class codigoService {

API: string = 'http://localhost/pluma/';

constructor(private clienteHttp: HttpClient) {
}

verOrganizacion(): Observable<any>{
    return this.clienteHttp.get(this.API+"ser_mostrar_organizaciones.php");
}

mostrarCodigo(datos:any): Observable<any>{
    console.log(datos, "datosdatosdatosdatos");
    const formData = new FormData();
    formData.append('id_organizacion', datos.organizacion);
    return this.clienteHttp.post(this.API+"ser_mostrar_QR_codes.php", formData);
}

mostrarCodigoId(datos:any): Observable<any>{
    const formData = new FormData();
    formData.append('id', datos); 
    return this.clienteHttp.post(this.API+"ser_mos_QR_for_ID.php", formData);
}

agregarCodigo(datos: any): Observable<any> {
    const formData = new FormData();
    formData.append('p_codigo', datos.codigo);
    formData.append('p_fk_id_pluma', datos.idPluma);
    formData.append('p_identificadorQR', datos.identificador);
    return this.clienteHttp.post<any>(this.API + "ser_insert_code_qr.php", formData);
  }

  actualizarCodigo(datos: any): Observable<any> {
    const formData = new FormData();
    formData.append('p_codigo', datos.codigo);
    formData.append('p_fk_id_pluma', datos.idPluma);
    formData.append('p_identificadorQR', datos.identificador);
    formData.append('p_id_code_qr', datos.p_id_codigo);
    return this.clienteHttp.post<any>(this.API + "ser_update_code_qr.php", formData);
}
}
