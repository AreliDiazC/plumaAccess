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
tipoUsuario(): Observable<any>{
    return this.clienteHttp.get(this.API+"ser_mostrar_tipos_users.php");
}




}