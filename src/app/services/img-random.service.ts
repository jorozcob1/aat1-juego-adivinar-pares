import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImgRandomService {
  private urlApi = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) {}

  obternerImagen(): Observable<any> {
    const urlWithCacheBusting = `${this.urlApi}?time=${new Date().getTime()}`;
    return this.http.get(urlWithCacheBusting);
  }
}
