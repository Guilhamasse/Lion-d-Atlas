import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'map', component: MapComponent },
    { path: '**', redirectTo: ''},
];