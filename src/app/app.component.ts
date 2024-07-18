import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgRandomService } from './services/img-random.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [ImgRandomService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  datosImg: any[] = [];

  constructor(private imgRandom: ImgRandomService) {}

  obtenerImagen(): void {
    this.imgRandom.obternerImagen().subscribe(
      (data) => {
        this.datosImg.push(data);
      },
      (error) => {
        console.log('Error al obtener la imagen', error);
      }
    );
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.obtenerImagen(), 100);
    }
  }
}
