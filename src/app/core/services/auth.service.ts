import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

import { ILogin } from '@interfaces/login.interface';
import { IResponseLogin } from '@interfaces/response.interface';
import Storage from "@utils/storage.util";
import { User } from '@models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userActive: User;
  public isAuthenticatedEmitter: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  isAuthenticated(): boolean {
    const isAuth = (this.userActive) ? true : false;
    this.emitUserAuthenticated(isAuth);
    return isAuth;
  }

  emitUserAuthenticated(isAuth: boolean): void {
    this.isAuthenticatedEmitter.next(isAuth);
  }

  get getUserActive(): User {
    return this.userActive;
  }

  login(data: ILogin): Observable<IResponseLogin> {
    const url = `${base_url}/auth/login`;
    return this.http.post<IResponseLogin>(url, data).pipe(map(resp => {
      this.setUserActiveInfo(resp);
      return resp;
    }));
  }

  validateToken() {
    const url = `${base_url}/auth/renew`;
    return this.http.get<IResponseLogin>(url, this.headers).pipe(map(resp => {
      this.setUserActiveInfo(resp);
      return true;
    }), catchError(err => of(false)));
  }

  private setUserActiveInfo(resp: IResponseLogin): void {
    Storage.deleteSessionStorage('x-token');
    Storage.saveSessionStorage('x-token', resp.token);
    this.userActive = resp.user;
    this.emitUserAuthenticated(true);
  }

}
