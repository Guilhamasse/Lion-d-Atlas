import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event_type } from '../models/event_type.model';
import { environment } from '../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class EventsTypeService {

  constructor(private http: HttpClient) { }

  getEventsType(): Observable<Event_type[]> {
    return this.http.get<Event_type[]>(`${environment.apiUrl}/eventEvent_type`);
  }

  getEventTypeById(_id: string): Observable<Event_type> {
    return this.http.get<Event_type>(`${environment.apiUrl}/event_type/` + _id);
  }
}