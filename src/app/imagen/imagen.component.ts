import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgRandomService } from '../services/img-random.service';
import { HttpClientModule } from '@angular/common/http';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ImgRandomService],
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css'],
})
export class ImagenComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  attempts = 0;
  isGameWon = false;

  constructor(private imgRandom: ImgRandomService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.cards = [];
    this.attempts = 0;
    this.isGameWon = false;
    for (let i = 0; i < 5; i++) {
      this.imgRandom.obternerImagen().subscribe(
        (data: any) => {
          const card: Card = {
            id: this.cards.length,
            imageUrl: data.message,
            isFlipped: false,
            isMatched: false,
          };
          this.cards.push(card, { ...card, id: this.cards.length + 1 });
          if (this.cards.length === 10) {
            this.shuffleCards();
          }
        },
        (error) => {
          console.log('Error al obtener la imagen', error);
        }
      );
    }
  }

  shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  flipCard(card: Card): void {
    if (
      this.isGameWon ||
      card.isMatched ||
      card.isFlipped ||
      this.flippedCards.length === 2
    )
      return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.attempts++;
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;
    if (card1.imageUrl === card2.imageUrl) {
      card1.isMatched = card2.isMatched = true;
      this.checkVictory();
    } else {
      card1.isFlipped = card2.isFlipped = false;
    }
    this.flippedCards = [];
  }

  checkVictory(): void {
    if (this.cards.every((card) => card.isMatched)) {
      this.isGameWon = true;
    }
  }

  restartGame(): void {
    this.loadImages();
  }
}
