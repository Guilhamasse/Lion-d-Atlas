import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from '../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiUrl}/event`);
  }

  getEventById(_id: string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiUrl}/event/` + _id);
  }
}