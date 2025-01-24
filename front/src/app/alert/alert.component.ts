import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/event.service';
import { Event } from '../models/event.model';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap, catchError, startWith, retryWhen, delayWhen } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy {
  latestEvent?: Event;
  private subscription?: Subscription;
  private lastEventId?: string;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    // Configuration de l'intervalle avec retry et gestion d'erreur
    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.eventsService.getEvents().pipe(
        catchError(error => {
          console.error('Erreur de requête:', error);
          return [];
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(1000))
        ))
      ))
    ).subscribe(
      (response: any) => {
        if (response?.data?.length > 0) {
          const newEvent = response.data[response.data.length - 1];
          if (newEvent.id !== this.lastEventId) {
            console.log('Ancien ID:', this.lastEventId);
            console.log('Nouvel ID:', newEvent.id);
            this.latestEvent = newEvent;
            this.lastEventId = newEvent.id;
            console.log('Nouvel événement détecté:', this.latestEvent);
          } else {
            console.log('Même événement, pas de mise à jour');
          }
        }
      },
      error => console.error('Erreur de souscription:', error)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}