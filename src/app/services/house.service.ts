import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class HouseService {
  constructor(private http: HttpClient) {}

  getHouses(): Observable<any> {
    return this.http.get(API_URL + 'house', httpOptions);
  }

  updateStatus(id: string, data: unknown): Observable<any> {
    return this.http.patch(
      API_URL + 'house/' + id + '/statusAccepted',
      data,
      httpOptions
    );
  }
}
