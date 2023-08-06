import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'environment/environment';
import { User } from '../models';

const API = environment.apiURL;

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

  register(user: User) {
    return this.http.post(`${environment.apiURL}`, user);
  }
}
