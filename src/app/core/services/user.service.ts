import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UtentePaziente } from '../models/utente-paziente.model';

@Injectable({
  providedIn: 'root' // questo servizio è provveduto nel root dell'app, tutti lo possono usare
})
export class UserService {

  private baseUrl = "http://localhost:8080";

  private localStorageKey = 'userData';

  constructor(private http: HttpClient) { }

  login (email: string, password: string): Observable<User>{
    const loginData = {email,password};
    return this.http.post(this.baseUrl+"/user/login", loginData);

  }

  createUserPaziente(userPaziente: UtentePaziente): Observable<UtentePaziente>{
    return this.http.post(this.baseUrl+"/user/crea-user-paziente", userPaziente);
  }

  // Metti la userData nel local storage durante il login
  storeUserData(userData: User): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(userData));
  }

  // Riceve la user data dal local storage per poter essere usata, la user data é di tipo User
  getUserData(): User | null {
    const userDataString = localStorage.getItem(this.localStorageKey);
    if (userDataString) {
      return JSON.parse(userDataString) as User;
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
