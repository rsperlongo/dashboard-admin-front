import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({});

  constructor(private tokenService: TokenService, private http: HttpClient) {
    if (this.tokenService.getToken()) {
      this.decodeJWT();
    }
  }

  public get userValue() {
    return this.userSubject.value;
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

  getAll() {
    return this.http.get<User[]>(`${environment.api_users}`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiURL}/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiURL}/${id}`, params).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.api_users}/${id}`).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
