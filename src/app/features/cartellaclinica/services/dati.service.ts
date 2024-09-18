import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utenti } from '../../../core/models/utenti.model';
import { Cartellaclinica } from '../../../core/models/cartellaclinica.model';
import { Dato } from '../../../core/models/dato.model';



@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private baseUrl = "http://localhost:8080";
  
 

  constructor(private http: HttpClient) {}

  getDatiByPazienteId(pazienteId: any): Observable<Dato[]> {
    const params = new HttpParams().set('pazienteId', pazienteId);
    return this.http.get<Dato[]>(`${this.baseUrl}/dato/get-dati`, { params });
  }

  getListaCartelle(utenti : Utenti) : Observable<Cartellaclinica[]>{
    //TODO per adesso usiamo post ma poi è un get quano usiamo spring security
    return this.http.post<Cartellaclinica[]>(this.baseUrl+"/cartella/post-lista-cartelle", utenti);
  }

  getDati(datoId: any): Observable<Dato[]> {
    const params = new HttpParams().set('datoId', datoId);
    return this.http.get<Dato[]>(`${this.baseUrl}/dato/get-dati-by-id`, { params });
  }



  

  



}
