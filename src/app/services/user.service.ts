import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { UserModel } from '../models/user.interface';

const API_URL = 'http://localhost:3001/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  loginUser(user: UserModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(API_URL + 'login', user, httpOptions)
      .pipe(tap(() => this.Refreshrequired.next()));
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(API_URL + '/users', user, httpOptions)
      .pipe(tap(() => this.Refreshrequired.next()));
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + 'users', httpOptions);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(API_URL + 'users/' + id, httpOptions);
  }

  updateUser(id: string, data: unknown): Observable<any> {
    return this.http
      .patch(API_URL + 'users/' + id, data)
      .pipe(tap(() => this.Refreshrequired.next()));
  }

  updateUserPassword(id: string, data: unknown): Observable<any> {
    return this.http
      .patch(API_URL + 'users/' + id + '/password', data, httpOptions)
      .pipe(tap(() => this.Refreshrequired.next()));
  }

  updateUserFavorites(id: string, data: unknown): Observable<any> {
    return this.http
      .patch(API_URL + 'users/' + id + '/favorite', data, httpOptions)
      .pipe(tap(() => this.Refreshrequired.next()));
  }

  updateUserDeletion(id: string, data: unknown): Observable<any> {
    return this.http
      .patch(API_URL + 'users/' + id + '/deletion', data, httpOptions)
      .pipe(tap(() => this.Refreshrequired.next()));
  }
}
