import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dato } from '../../../core/models/dato.model';

@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private baseUrl = "http://localhost:8080";
 

  constructor(private http: HttpClient) {}

  getDati(pazienteid : any): Observable<Dato[]>{
    return this.http.get<Dato[]>(this.baseUrl+"/dato/get-dati");
  }

  



}
