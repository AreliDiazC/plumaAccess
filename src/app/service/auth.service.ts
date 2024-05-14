import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { of, from  } from 'rxjs'; 
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Servicio para la autentificacion
  //Trabajar con BehaviourSubjects
  public loggedIn = new BehaviorSubject<boolean>(false);
  public role = new BehaviorSubject<string>('');
  usuarioRegistrado: any[] = [];
  idUsuario:number =0;
  userRole: string = '';

  isConnected: boolean = true;

  API: string = 'http://localhost/pluma/';

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private clienteHttp: HttpClient) {
  }

  loginBS(data: any): Observable<any> {
    const url = `${this.API}ser_login.php`;

    const formData = new FormData();
    formData.append('nomUser', data.email);
    formData.append('pass', data.password);

    return this.clienteHttp.post(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error, "error");
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



  /*loginBS(data: any): Observable<any> {

  const url = `${this.API}ser_login.php?`;
 
  return this.clienteHttp.request('POST', url, form)
      .pipe(
        catchError((err: any) => {
          console.log("err", err);
          if (err.status == 0) {
            const errorMessage = err.error;
            return throwError(() => errorMessage);
            
          } else if (err.status === 401) {
            const errorMessage = err.error.message;
            return throwError(() => errorMessage);
          } else {
            return throwError(() => 'Error desconocido');
          }
        })
      );
  }*/

 logoutBS(): void {
  this.loggedIn.next(false);
  this.role.next('');
  this.router.navigate(['login'], { replaceUrl: true });
}

isLoggedInBS(): boolean {
  return this.loggedIn.getValue();
}

isAdmin(): boolean {
  return this.role.getValue() === 'Administrador';
}

isRecepcion(): boolean {
  return this.role.getValue() === 'Recepcionista';
}

isSupadmin():boolean {
  return this.role.getValue() === 'SuperAdmin';
}


getRole(): string {
  return this.role.getValue();
}

}
