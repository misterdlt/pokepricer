import { Injectable, signal } from '@angular/core';
import { Card } from '../../models/card/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards = signal<Card[]>([]);

  updateCards(cards: Card[]) {
    this.cards.set(cards);
  }
} 