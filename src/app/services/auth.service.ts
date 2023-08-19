import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'environment/environment';
import { User } from '../models';

const API = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  authenticate(username: string, password: string) {
    return this.http
      .post(
        `${API}`,
        {
          username,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(null);
          this.isLoggedIn = true;
          return user;
        })
      );
  }

  logout() {
    this.isLoggedIn = false;
  }

  public get userValue() {
    return this.userSubject.value;
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      {
        username,
        password,
        lastName,
        firstName,
      },
      httpOptions
    );
  }
}
