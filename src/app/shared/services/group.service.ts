import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../core/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = "http://localhost:8080";
 

  constructor(private http: HttpClient) {}

  getGroup(): Observable<Group[]>{
    return this.http.get<Group[]>(this.baseUrl+"/group/get-group");

  }


}




