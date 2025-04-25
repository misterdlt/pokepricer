import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Card, SingleCardResponse } from '../../models/card/card';
import { CommonModule } from '@angular/common';
import { PokemonTcgApiService } from '../../services/pokemon-tcg/pokemon-tcg-api.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent implements OnInit {
  card: Card | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonTcgApiService = inject(PokemonTcgApiService);

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;
    const navigation = this.router.getCurrentNavigation();
    const stateCard = navigation?.extras?.state?.['card'];

    if (stateCard) {
      console.log('Card data received via state:', stateCard);
      this.card = stateCard;
      this.isLoading = false;
    } else {
      const cardId = this.route.snapshot.paramMap.get('id');
      console.log('Card data not found in state, fetching ID from route:', cardId);
      if (cardId) {
        this.fetchCardDetails(cardId);
      } else {
        this.error = 'Card ID not found in URL.';
        this.isLoading = false;
      }
    }
  }

  fetchCardDetails(id: string): void {
    this.pokemonTcgApiService.getCard(id).subscribe({
      next: (response: SingleCardResponse) => {
        if (response.data) {
          this.card = response.data;
          console.log('Card data fetched successfully:', this.card);
        } else {
          this.error = `Card with ID ${id} not found (API returned no data).`;
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching card details:', err);
        if (err.status === 404) {
          this.error = `Card with ID ${id} not found.`;
        } else {
          this.error = 'Failed to fetch card details. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }

  formatPriceKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  getPriceEntries(prices: any): [string, any][] {
    return prices ? Object.entries(prices).filter(([_, value]) => value !== null) : [];
  }
}
