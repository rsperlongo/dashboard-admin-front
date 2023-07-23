import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url: string = 'http://localhost:3000/user';
  headers = new HttpHeaders().set('Content-Type', 'applicatio/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private userSubject: BehaviorSubject<User | null>
  ) {}

  register(user: User): Observable<any> {
    return this.http
      .post(`${this.api_url}/register`, user)
      .pipe(catchError((error) => error));
  }

  /*  login(user: User) {
    return this.http.post<any>(`${this.api_url}/login`, user)
    .subscribe((res: any) => {
      localStorage.setItem('acces_token', res.token)
      this.register(res.id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['/users/profile' + res.msg._id]);
      })
    })
  } */
  login(username: string, password: string) {
    return this.http
      .post<User>(`${this.api_url}/users/authenticate`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return msg;
  }
}
