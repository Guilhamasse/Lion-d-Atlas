import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { Zone } from './zone/zone.model';
import { ZoneComponent } from './zone/zone.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent, MapComponent, ZoneComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Ycata';
  zones: Zone[] = [
    { id: 1, name: 'Zone 1', title: '', content: '' },
    { id: 2, name: 'Zone 2', title: '', content: '' },
    { id: 3, name: 'Zone 3', title: '', content: '' },
    { id: 4, name: 'Zone 4', title: '', content: '' },
    { id: 5, name: 'Zone 5', title: '', content: '' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // S'abonner aux changements de navigation et observer les fragments dans l'URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Nous nous intéressons seulement aux événements de fin de navigation
    ).subscribe(() => {
      // Récupérer le fragment de l'URL
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        // Faire défiler vers l'élément avec l'ID correspondant
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Scrolling fluide
        }
      }
    });
  }
 
  
}
