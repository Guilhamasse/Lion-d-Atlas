import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { Zone } from './zone/zone.model';
import { ZoneComponent } from './zone/zone.component';
import { FooterComponent } from "./footer/footer.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { AlertComponent } from "./alert/alert.component";
import { PartComponent } from "./part/part.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MapComponent,
    FooterComponent,
    IntroductionComponent,
    AlertComponent,
    ZoneComponent,
    PartComponent
],
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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}