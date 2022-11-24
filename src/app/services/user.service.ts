import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  UserModel } from '../models/user.interface';

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

  loginUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_URL + 'login', user, httpOptions);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(
      API_URL + '/users',
      user,
      httpOptions
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + 'users', httpOptions);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(API_URL + 'users/' + id, httpOptions);
  }

  updateUser(id: string, data: unknown): Observable<any> {
    return this.http.patch(API_URL + 'users/' + id, data, httpOptions);
  }

  updateUserPassword(id: string, data: unknown): Observable<any> {
    return this.http.patch(
      API_URL + 'users/' + id + '/password',
      data,
      httpOptions
    );
  }

  //  http://localhost:3001/api/users/636e9d442e5cdd6aebcb5e51/favorite
  //  http://localhost:3001/api/users/636e9d442e5cdd6aebcb5e51/deletion
}
