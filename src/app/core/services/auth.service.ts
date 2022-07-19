import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

import { ILogin } from '@interfaces/login.interface';
import { IResponseLogin } from '@interfaces/response.interface';
import Storage from "@utils/storage.util";
import { User } from '@models/user.model';
import { SettingService } from './setting.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userActive: User;
  public isAuthenticatedEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private settingService:SettingService,
  ) { }

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  isAuthenticated(): boolean {
    return (this.userActive) ? true : false;
  }

  showModalAuth(): void {
    const isAuth: boolean = this.userActive ? true : false;
    this.isAuthenticatedEmitter.emit(isAuth);
  }

  get getUserActive(): User {
    return this.userActive;
  }

  login(data: ILogin): Observable<IResponseLogin> {
    const url = `${base_url}/auth/login`;
    return this.http.post<IResponseLogin>(url, data).pipe(map(resp => {
      this.setUserActiveInfo(resp);
      this.isAuthenticatedEmitter.emit(true);
      const { user } = resp;
      this.settingService.setTheme(user.darkMode ? 'dark' : 'light');
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
    this.showModalAuth();
  }

  signIn(data: ILogin): Observable<Boolean> {
    const url = `${base_url}/user`;
    return this.http.post<IResponseLogin>(url, data).pipe(map(resp => {
      this.setUserActiveInfo(resp);
      this.isAuthenticatedEmitter.emit(true);
      return resp.ok;
    }))
  }

  setNewUserInfo(name: string, lastName: string): void {
    this.userActive.name = name;
    this.userActive.lastName = lastName
  }

}
