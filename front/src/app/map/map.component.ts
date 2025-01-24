import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    // Initialiser la carte centrée sur Toulouse
    this.map = L.map('map').setView([43.6047, 1.4442], 12);

    // Ajouter une couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Rayon d'un hexagone (en mètres)
    const radius = 2000;

    // Calcul de l'espacement horizontal et vertical
    const horizontalSpacing = 2 * radius; // Distance entre deux hexagones sur la même ligne
    const verticalSpacing = Math.sqrt(3) * radius; // Distance entre deux lignes d'hexagones

    // Coordonnées du centre de Toulouse
    const toulouseCenter = { lat: 43.6047, lng: 1.4442 };

    // Points centraux des 5 hexagones ajustés
    const centers = [
      { lat: toulouseCenter.lat, lng: toulouseCenter.lng }, // Zone rouge (centre)
      { 
        lat: toulouseCenter.lat + verticalSpacing / 111000, 
        lng: toulouseCenter.lng 
      }, // Zone bleue (Nord)
      { 
        lat: toulouseCenter.lat - verticalSpacing / 111000, 
        lng: toulouseCenter.lng 
      }, // Zone verte (Sud)
      { 
        lat: toulouseCenter.lat + (verticalSpacing / 2) / 111000, 
        lng: toulouseCenter.lng - (horizontalSpacing * 0.7) / (111000 * Math.cos(toulouseCenter.lat * Math.PI / 180)) // Décalée beaucoup plus à gauche
      }, // Zone violette (à gauche de rouge et bleu)
      { 
        lat: toulouseCenter.lat - (verticalSpacing / 2) / 111000, 
        lng: toulouseCenter.lng - (horizontalSpacing * 0.7) / (111000 * Math.cos(toulouseCenter.lat * Math.PI / 180)) // Décalée beaucoup plus à gauche
      }, // Zone jaune (à gauche de rouge et verte)
    ];

    // Générer les hexagones
    centers.forEach((center, index) => {
      const hexagonCoords = this.calculateHexagonCoords(center.lat, center.lng, radius);
      this.addHexagon(hexagonCoords, this.getColorByIndex(index));
    });
  }

  // Calculer les sommets d'un hexagone
  calculateHexagonCoords(lat: number, lng: number, radius: number): L.LatLng[] {
    const R = 6371000; // Rayon de la Terre en mètres
    const coords: L.LatLng[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30); // Décalage pour aligner correctement l'hexagone
      const newLat = lat + (radius / R) * (180 / Math.PI) * Math.cos(angle);
      const newLng =
        lng + (radius / R) * (180 / Math.PI) * Math.sin(angle) / Math.cos((Math.PI / 180) * lat);
      coords.push(L.latLng(newLat, newLng));
    }
    coords.push(coords[0]); // Fermer l'hexagone
    return coords;
  }

  // Ajouter un hexagone sur la carte
  addHexagon(hexagonCoords: L.LatLng[], color: string): void {
    const hexagon = L.polygon(hexagonCoords, {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
    });
    hexagon.addTo(this.map);
  }

  // Couleur spécifique pour chaque hexagone
  getColorByIndex(index: number): string {
    const colors = ['#FF5733', '#3357FF', '#33FF57', '#DA33FF', '#FFEB33']; // Rouge, Bleu, Vert, Violet, Jaune
    return colors[index % colors.length];
  }
}