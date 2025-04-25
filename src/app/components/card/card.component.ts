import { Component, Input } from '@angular/core';
import { Card } from '../../models/card/card';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;

  getTCGPlayerPrice(): string {
    if (!this.card.tcgplayer?.prices) {
      return 'N/A';
    }

    const priceData = Object.values(this.card.tcgplayer.prices)[0];
    if (priceData && priceData.market) {
      return priceData.market.toFixed(2);
    }

    return 'N/A';
  }

  getCardmarketPrice(): string {
    if (!this.card.cardmarket?.prices) {
      return 'N/A';
    }

    const priceData = this.card.cardmarket.prices;
    if (priceData && priceData.trendPrice) {
      return priceData.trendPrice.toFixed(2);
    }

    return 'N/A';
  }
}
