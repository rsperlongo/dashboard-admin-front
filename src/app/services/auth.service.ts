import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'environment/environment';
import { UserService } from './user.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  authenticate(username: any, password: any): Observable<HttpResponse<any>> {
    return this.http.post(`${ API }`, {
      username: username ,
      password: password,
    },
    { observe: 'response' }
    )
    .pipe(
      tap((res) => {
        const authToken = res.headers.get('x-access-token') ?? '';
        this.userService.saveToken(authToken);
      })
    )
  }
}
