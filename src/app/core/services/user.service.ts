import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Paziente } from '../models/paziente.model';
import { Utenti } from '../models/utenti.model';


@Injectable({
  providedIn: 'root' // questo servizio è provveduto nel root dell'app, tutti lo possono usare
})
export class UserService {

  private baseUrl = "http://localhost:8080";

  private localStorageKey = 'userData';

  constructor(private http: HttpClient) { }

  login (email: string, password: string): Observable<Utenti>{
    const loginData = {email,password};
    return this.http.post(this.baseUrl+"/user/login", loginData);

  }

  createUtenti(userPaziente: Utenti): Observable<Utenti>{
    return this.http.post(this.baseUrl+"/user/crea-user-paziente", userPaziente);
  }

  // Metti la userData nel local storage durante il login
  storeUtentiData(pazienteData: Utenti): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(pazienteData));
  }

  // Riceve la user data dal local storage per poter essere usata, la user data é di tipo User
  getUtentiData(): Utenti | null {
    const pazienteDataString = localStorage.getItem(this.localStorageKey);
    if (pazienteDataString) {
      return JSON.parse(pazienteDataString) as Utenti;
    }
    return null;
  }

  // Controlla se lo user é gia loggato (eg. esistono i dati nel local storage)
  isLoggedIn(): boolean {
    // TODO guarda cosa significa strictly not
    return !!localStorage.getItem(this.localStorageKey);
  }

  // Il logout elimina l'item dal local storage
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

}
