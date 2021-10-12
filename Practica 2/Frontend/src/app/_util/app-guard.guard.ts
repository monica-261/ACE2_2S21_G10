import { AppServiceService } from '../_services/app-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private appService: AppServiceService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.nextUrlSecurity(next.url.toString());
  }

  nextUrlSecurity(route: string): boolean {
    const urlSegurity: string[] = this.appService.getUrlSecurity();
    let existMenu = false;

    urlSegurity.forEach(url => {
      if (url.indexOf(route) >= 0) {
        existMenu = true;
      }
    });
    return existMenu;
  }
}
