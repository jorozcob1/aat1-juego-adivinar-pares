import { Component, OnInit } from '@angular/core';
import { ImgRandomService } from '../services/img-random.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ImgRandomService],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css',
})
export class ImagenComponent implements OnInit {
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
