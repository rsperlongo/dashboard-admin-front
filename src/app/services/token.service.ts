import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public returnToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  public saveToken(token: string) {
    // localStorage.setItem(KEY, token);
    localStorage.setItem('user', JSON.stringify(token));
  }

  public removeToken() {
    localStorage.removeItem(KEY);
  }

  public getToken() {
    return !!this.returnToken();
  }
}
