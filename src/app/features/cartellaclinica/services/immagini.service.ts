import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImmaginiService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getImmagini(immagineId: any): Observable<any> {
    const params = new HttpParams().set('immagineId', immagineId);
    return this.http.get(`${this.baseUrl}/immagine/get-immagini`, { params });
  }
}
