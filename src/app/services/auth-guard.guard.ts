import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((state) => {
        if (!state) this.router.navigate(['/login']);
      })
    );
  }
  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((state) => {
        if (!state) this.router.navigate(['/login']);
      }),
      take(1)
    );
  }
}
