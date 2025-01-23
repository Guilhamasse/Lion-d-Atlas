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
    this.map = L.map('map').setView([43.6047, 1.4442], 13);  // Coordonnées de Toulouse

    // Ajouter une couche de tuiles (par exemple OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Ajouter des cercles couvrant Toulouse sans qu'ils se touchent
    const radius = 4000;  // Rayon des cercles (4 km)
    const spacing = 2 * radius + 500; // Espacement entre les cercles

    // Zone 1 - Centre de Toulouse
    this.addCircle(43.6047, 1.4442, radius, '#FF0000');   

    // Zone 2 - Nord de Toulouse (en tenant compte de l'espacement)
    this.addCircle(43.6300, 1.4100, radius, '#0000FF');  

    // Zone 3 - Sud de Toulouse
    this.addCircle(43.5700, 1.4442, radius, '#008000');  

    // Zone 4 - Est de Toulouse
    this.addCircle(43.5800, 1.5000, radius, '#FFFF00'); 

  }

  addCircle(lat: number, lng: number, radius: number, color: string): void {
    L.circle([lat, lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: radius
    }).addTo(this.map);
  }
}
