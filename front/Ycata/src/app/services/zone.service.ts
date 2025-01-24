import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';
import { environment } from '../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${environment.apiUrl}/zone`);
  }

  getZoneById(_id: string): Observable<Zone> {
    return this.http.get<Zone>(`${environment.apiUrl}/zone/` + _id);
  }
}