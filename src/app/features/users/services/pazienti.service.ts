import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paziente } from '../../../core/models/paziente.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PazientiService {
  private baseUrl = "http://localhost:8080";
  

  constructor(private http: HttpClient) { }

  getListaPazienti(): Observable<Paziente[]> {
    return this.http.get<Paziente[]>(`${this.baseUrl}/paziente/get-lista-pazienti`);
  }

  eliminaPaziente(pazienteId: any): Observable<any> {
    const params = new HttpParams().set('pazienteId', pazienteId);
    return this.http.delete(`${this.baseUrl}/paziente/elimina-paziente-by-id`, { params, responseType: 'text' });
  }

}
