import { RouterOutlet } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Ycata';


  //Génération de la map
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([43.6045, 1.4442], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Triangle rouge 
    L.polygon([
      [43.6, 1.44],
      [43.61, 1.45],
      [43.61, 1.43],
    ], { color: 'red' }).addTo(this.map).bindPopup("Zone 1");
  }
}
