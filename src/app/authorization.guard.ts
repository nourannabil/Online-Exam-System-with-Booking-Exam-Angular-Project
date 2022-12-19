import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate {

  constructor(private toastr: ToastrService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state);
    const token = localStorage.getItem('token');
    if (token) {
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.Roleid == 1) {
            // this.toastr.success(`Welcome Admin ${user.FirstName} `);
            return true;
          }
          else {
            this.toastr.warning('Sorry , this page for Admin');
            this.route.navigate(['security/login']);
            localStorage.clear();
            return false;
          }
        }
        else {
          this.toastr.warning('Sorry , this page for Admin');
          this.route.navigate(['']);
          return false;
        }
      } else if (state.url.indexOf('user') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.Roleid == 2) {
            // this.toastr.success(`Welcome user ${user.FirstName} `);
            return true;
          }
          else {
            this.toastr.warning('Sorry , this page for user');
            this.route.navigate(['security/login']);
            localStorage.clear();
            return false;
          }
        }
        else {
          this.toastr.warning('Sorry , this page for user');
          this.route.navigate(['']);
          return false;
        }
      }
      return true;
    }
    else {
      this.route.navigate(['security/login']);
      this.toastr.warning('Please Login');
      return false;
    }
  }
}
