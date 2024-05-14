import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class usuarioService {

API: string = 'http://localhost/pluma/';

constructor(private clienteHttp: HttpClient) {
}

verUsuarios(id: any): Observable<any>{
    const formData = new FormData();
    formData.append('id_admin', id);
    return this.clienteHttp.post(this.API+"ser_mostrar_user_por_admin.php", formData);
}

verUsuariosId(id: any): Observable<any>{
    const formData = new FormData();
    formData.append('id', id);
    return this.clienteHttp.post(this.API+"ser_mos_user_for_ID.php", formData).pipe(
      catchError(error => {
        // Aquí puedes manejar el error como desees
        console.error('Error al obtener usuarios por ID:', error);
        // Devuelve un observable de error
        return throwError(error);
      })
    );
  }

tipoUsuario(): Observable<any>{
    return this.clienteHttp.get(this.API+"ser_mostrar_tipos_users.php");
}

agregarUsuario(datos: any): Observable<any>{
    console.log(datos, "datoooooooooooooooooos");
    const formData = new FormData();
    formData.append('p_nombre_completo', datos.nombre);
    formData.append('p_celular', datos.celular);
    formData.append('p_fk_id_tipo_user', datos.tipoUsuario);
    formData.append('p_fk_id_qr_code', datos.codigoQR);
    formData.append('p_perteneceA', datos.perteneceA);
    formData.append('p_start_date', datos.fechaInicio);
    formData.append('p_end_date', datos.fechaFin);
    formData.append('p_start_hour', datos.horaInicio);
    formData.append('p_end_hour', datos.horaFin);
    formData.append('p_code_phone_device', datos.code_phone_device);
    formData.append('p_visible', datos.visible);
    return this.clienteHttp.post(this.API+"ser_insert_invitacion.php", formData);
}

actualizaUsuario(datos:any): Observable<any>{
    const formData = new FormData();
    formData.append('p_nombre_completo', datos.nombre);
    formData.append('p_celular', datos.celular);
    formData.append('p_fk_id_tipo_user', datos.tipoUsuario);
    formData.append('p_fk_id_qr_code', datos.codigoQR);
    formData.append('p_start_date', datos.fechaInicio);
    formData.append('p_end_date', datos.fechaFin);
    formData.append('p_start_hour', datos.horaInicio);
    formData.append('p_end_hour', datos.horaFin);
    formData.append('p_id_user', datos.p_id_user);
    return this.clienteHttp.post(this.API+"ser_update_usuario.php", formData);
}

mostrarqr(): Observable<any>{
    return this.clienteHttp.get(this.API+"sp_mostrar_todos_qr.php");
}

}