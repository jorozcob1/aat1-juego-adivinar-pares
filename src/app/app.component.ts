import { Component } from '@angular/core';
import { ImagenComponent } from './imagen/imagen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImagenComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Juego de Memoria';
}
