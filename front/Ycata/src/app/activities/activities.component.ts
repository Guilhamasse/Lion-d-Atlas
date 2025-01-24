import { Component } from '@angular/core';
// import { PrimeNG } from 'primeng/config';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-activities',
  imports: [CarouselModule, ButtonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

}
