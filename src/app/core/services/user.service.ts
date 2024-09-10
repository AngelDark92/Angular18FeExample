import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root' // questo servizio è provveduto nel root dell'app, tutti lo possono usare
})
export class UserService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login (email: string, password: string): Observable<User>{
    const loginData = {email,password};
    return this.http.post(this.baseUrl+"/user/login", loginData);

  }

  createUser(user: User): Observable<User>{
    return this.http.post(this.baseUrl+"/user/crea-user", user);
  }
}
