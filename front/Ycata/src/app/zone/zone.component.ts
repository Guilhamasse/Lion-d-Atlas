import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Zone } from '../models/zone.model';
import { ZonesService } from '../services/zone.service';
import { switchMap, catchError, startWith, retryWhen, delayWhen } from 'rxjs/operators';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-zone',
  imports: [CommonModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})

export class ZoneComponent implements OnInit {
  @Input() zone!: Zone;
  private subscription?: Subscription;
  isExpanded: boolean = false;
  isEventOccurred: boolean = false;
  zoneBackgroundColor: string = '#ECC4AC'; 
  zoneTextColor: string = 'black';
  zoneContentBackgroundColor: string = '#f2d4c0'; 
  zoneContentTextColor: string = 'black';

  constructor(private zonesService: ZonesService) {}

  ngOnInit() {
    //this.simulateApiCall();
    this.subscription = timer(0, 2000).pipe(
          switchMap(() => this.zonesService.getZoneById(this.zone.id).pipe(
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
            if (response.data.description != '') {
              this.isEventOccurred = true;
              this.zoneBackgroundColor = '#A4031F';  // Couleur d'événement
              this.zoneTextColor = 'white';  // Texte en blanc
              this.zoneContentBackgroundColor = '#B24054';  // Couleur d'événement
              this.zoneContentTextColor = 'white';  // Texte en blanc
              this.zone.description = response.data.description;
            } else {
              this.zone.description = 'Rien à signaler';
            }
          },
          error => console.error('Erreur de souscription:', error)
        );
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  // Simuler un appel API
  simulateApiCall() {
    setTimeout(() => {
      // Vérification de la zone pour appliquer les changements
      if (this.zone.id === "1" || this.zone.id === "3") {
        // Si c'est la zone 1 ou 3, il y a un événement
        this.isEventOccurred = true;
        this.zoneBackgroundColor = '#A4031F';  // Couleur d'événement
        this.zoneTextColor = 'white';  // Texte en blanc
        this.zoneContentBackgroundColor = '#B24054';  // Couleur d'événement
        this.zoneContentTextColor = 'white';  // Texte en blanc
        this.zone.description = 'Catastrophe de zinzin, il se passe des choses';
      } else {
        // Si c'est une autre zone, on affiche "Rien à signaler" si le content est vide
        if (!this.zone.description) {
          this.zone.description = 'Rien à signaler';
        }
      }
    }, 3000); // Appel simulé après 3 secondes
  }
}
