import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined') {
      let val: string | null = localStorage.getItem('loggedIn');
      if (val !== null && val === 'true') { 
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      return false;
    }
  }
  
  
}
