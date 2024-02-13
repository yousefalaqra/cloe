import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
