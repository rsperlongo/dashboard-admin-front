import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({})

  constructor(private tokenService: TokenService) { 
    //this.tokenService.getToken() && this.decodeJWT()
    if (this.tokenService.getToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.returnToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  public returnUser() {
    return this.userSubject.asObservable();
  }

  public saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  public logout() {
    this.tokenService.removeToken();
    this.userSubject.next({});
  }

  public isLoggedIn() {
    return this.tokenService.getToken();
  }
}