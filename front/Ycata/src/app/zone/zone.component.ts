import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Zone } from './zone.model';

@Component({
  selector: 'app-zone',
  imports: [CommonModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent {
  @Input() zone!: Zone;
  isExpanded: boolean = false;
  isEventOccurred: boolean = false;
  zoneBackgroundColor: string = '#ECC4AC'; 
  zoneTextColor: string = 'black';
  zoneContentBackgroundColor: string = '#f2d4c0'; 
  zoneContentTextColor: string = 'black';

  ngOnInit() {
    this.simulateApiCall();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  // Simuler un appel API
  simulateApiCall() {
    setTimeout(() => {
      // Vérification de la zone pour appliquer les changements
      if (this.zone.id === 1 || this.zone.id === 3) {
        // Si c'est la zone 1 ou 3, il y a un événement
        this.isEventOccurred = true;
        this.zoneBackgroundColor = '#A4031F';  // Couleur d'événement
        this.zoneTextColor = 'white';  // Texte en blanc
        this.zoneContentBackgroundColor = '#B24054';  // Couleur d'événement
        this.zoneContentTextColor = 'white';  // Texte en blanc
        this.zone.content = 'Catastrophe de zinzin, il se passe des choses';
        this.zone.title = 'Catastrophe de zinzin';
      } else {
        // Si c'est une autre zone, on affiche "Rien à signaler" si le content est vide
        if (!this.zone.content) {
          this.zone.content = 'Rien à signaler';
        }
      }
    }, 3000); // Appel simulé après 3 secondes
  }
}
