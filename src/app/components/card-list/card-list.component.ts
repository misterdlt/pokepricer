import { Component, inject } from '@angular/core';
import { CardService } from '../../services/card-service/card.service';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  cardService = inject(CardService);
}
