import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
          // logged in, so return true
          this.authService.isLoggedIn;
          return true;
        }
}
