import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utenti } from '../../../core/models/utenti.model';
import { Cartellaclinica } from '../../../core/models/cartellaclinica.model';
import { Dato } from '../../../core/models/dato.model';
import { ListaDati } from '../../../core/models/lista-dati.model';
import { Immagine } from '../../../core/models/immagine.model';



@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private baseUrl = "http://localhost:8080";
  
 

  constructor(private http: HttpClient) {}

  getDatiByPazienteId(pazienteId: any): Observable<ListaDati> {
    const params = new HttpParams().set('pazienteId', pazienteId);
    return this.http.get(`${this.baseUrl}/dato/get-dati`, { params });
  }

  
  getListaCartelle(utenti : Utenti) : Observable<Cartellaclinica[]>{
    //TODO per adesso usiamo post ma poi è un get quano usiamo spring security
    return this.http.post<Cartellaclinica[]>(this.baseUrl+"/cartella/post-lista-cartelle", utenti);
  }

  getDato(datoId: any): Observable<Dato> {
    const params = new HttpParams().set('datoId', datoId);
    return this.http.get(`${this.baseUrl}/dato/get-dati-by-id`, { params });
  }

  eliminaCartella(medicoId: any, cartellaId: any): Observable<any> {
    const params = new HttpParams()
    .set('medicoId', medicoId)
    .set('cartellaId', cartellaId); 
    return this.http.delete(`${this.baseUrl}/cartella/elimina-cartella-by-id`, { params, responseType: 'text' });
  }

  eliminaDato(datoId: any): Observable<any> {
    const params = new HttpParams().set('datoId', datoId);
    return this.http.delete(`${this.baseUrl}/dato/elimina-dato-by-id`, { params, responseType: 'text' });
  }

  aggiungiImmagine(formData: FormData, datoId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/immagine/crea-immagine`, formData, {
      params: { datoId } // 
    });
  }
  

  }
  


  
