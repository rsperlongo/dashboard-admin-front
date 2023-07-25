import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'environment/environment';
import { UserService } from './user.service';
import { User } from '../models';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  authenticate(username: string, password: string) {
    return this.http.post(`${ API }`, {
      username,
      password,
    },
    { observe: 'response' }
    )
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(null);
      return user;
    })
      /* tap((res) => {
        const authToken = res.headers.get('access_token') ?? '';
        this.userService.saveToken(authToken);
      }) */
    )
  }
}
