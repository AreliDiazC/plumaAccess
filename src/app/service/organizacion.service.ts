import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class organizacionService {

API: string = 'http://localhost/pluma/';

constructor(private clienteHttp: HttpClient) {
}


tiposOrganizaciones(): Observable<any>{
    return this.clienteHttp.get(this.API+"ser_mostrar_tipos_organizaciones.php");
}


agregarTipoOrganizacion(datos: any): Observable<any>{
    console.log(datos, "datoooooooooooooooooos");
    const formData = new FormData();
    formData.append('nombre_tipo_org', datos.nombre_tipo_org);
    return this.clienteHttp.post(this.API+"ser_insertar_tipo_organizacion.php", formData);
}
verTipoOrgID(id: any): Observable<any>{
    const formData = new FormData();
    formData.append('id', id);
    return this.clienteHttp.post(this.API+"ser_mos_tipo_org_for_ID.php", formData).pipe(
      catchError(error => {
        // Aquí puedes manejar el error como desees
        console.error('Error al obtener usuarios por ID:', error);
        // Devuelve un observable de error
        return throwError(error);
      })
    );
  }

  actualizaTipOrg(datos:any): Observable<any>{
    const formData = new FormData();
    formData.append('p_id_tipo_organizacion', datos.p_id_tipo_organizacion);
    formData.append('p_nombre_tipo_organizacion', datos.nombre_tipo_organizacion);
    return this.clienteHttp.post(this.API+"ser_update_tipo_organizacion.php", formData);
}


}