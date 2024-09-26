import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paziente } from '../../../core/models/paziente.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cartellaclinica } from '../../../core/models/cartellaclinica.model';
import { PazienteConCartella } from '../../../core/models/paziente-con-cartella.model';

@Injectable({
  providedIn: 'root'
})
export class PazientiService {
  private baseUrl = "http://localhost:8080";
  

  constructor(private http: HttpClient) { }

  getListaPazienti(): Observable<PazienteConCartella[]> {
    return this.http.get<PazienteConCartella[]>(`${this.baseUrl}/paziente/get-lista-pazienti`);
  }

  eliminaPaziente(pazienteId: any): Observable<any> {
    const params = new HttpParams().set('pazienteId', pazienteId);
    return this.http.delete(`${this.baseUrl}/paziente/elimina-paziente-by-id`, { params, responseType: 'text' });
  }


  creaCartellaClinicaPerPaziente(pazienteId: any, medicoId: any): Observable<any> {
    const params = new HttpParams()
    .set('medicoId', medicoId)
    .set('pazienteId', pazienteId);
  console.log(pazienteId + " " + medicoId);
    return this.http.post(`${this.baseUrl}/cartella/crea-cartella`, null, { params });
  }

}
