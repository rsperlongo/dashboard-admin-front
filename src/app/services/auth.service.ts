import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'environment/environment';
import { UserService } from './user.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
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
