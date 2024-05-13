import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  private _mostrarBarraLateralSubject = new BehaviorSubject<boolean>(true);
  mostrarBarraLateral$: Observable<boolean> = this._mostrarBarraLateralSubject.asObservable();

  toggleMostrarBarraLateral() {
    this._mostrarBarraLateralSubject.next(!this._mostrarBarraLateralSubject.value);
  }
}
