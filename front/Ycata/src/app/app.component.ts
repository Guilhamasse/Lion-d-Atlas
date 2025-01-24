import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ycata';


 
  
}
