import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url: string = 'http://localhost:3000/user'
  headers = new HttpHeaders().set('Content-Type', 'applicatio/json');
  currentUser = {}

  constructor(private http: HttpClient, public router: Router) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.api_url}/register`, user).pipe(
      catchError((error) => error)
    )
  }

  login(user: User) {
    return this.http.post<any>(`${this.api_url}/login`, user)
    .subscribe((res: any) => {
      localStorage.setItem('acces_token', res.token)
      this.register(res.id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['/users/profile' + res.msg._id]);
      })
    })
  }

  
}
