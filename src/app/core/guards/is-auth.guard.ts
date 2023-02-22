import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate():
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authService.validateToken().pipe(tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/').then(() => {
            this.authService.showModalAuth('init');
          });
        }
      }));
  }

}
