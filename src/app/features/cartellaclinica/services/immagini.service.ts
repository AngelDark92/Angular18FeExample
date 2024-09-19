import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImmagineResponse } from '../../../core/models/immagine-response.model';

@Injectable({
  providedIn: 'root'
})
export class ImmaginiService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getImmagine(immagineId: any): Observable<ImmagineResponse> {
    const params = new HttpParams().set('immagineId', immagineId);
    return this.http.get(`${this.baseUrl}/immagine/get-immagine-base64-by-id`, { params });
  }
}
