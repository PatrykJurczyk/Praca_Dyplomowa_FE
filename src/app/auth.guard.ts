import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router,Route, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = window.sessionStorage.getItem('')
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if (path?.includes('manager') && userRole === 'Manager') {
      return true;
    }

    if (path?.includes('admin') && userRole === 'Admin') {
      return true;
    }

    if (path?.includes('user') && userRole === 'User') {
      return true;
    }

    this.router.navigateByUrl('/forbidden');
    return false;
  }

}
