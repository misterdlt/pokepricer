import { Component, inject, signal, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { PokemonTcgApiService } from '../../services/pokemon-tcg/pokemon-tcg-api.service';
import { CardService } from '../../services/card-service/card.service';
import { NameServiceService } from '../../services/pokemon-names/name-service.service';
import { SuggestionsComponent } from '../suggestions/suggestions.component';
import { ionCamera } from '@ng-icons/ionicons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  imports: [ButtonComponent, SuggestionsComponent, NgIcon],
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [provideIcons({ ionCamera })],
})
export class SearchBarComponent implements OnInit {
  searchTerm = signal('');
  cardService = inject(CardService);
  nameService = inject(NameServiceService);
  pokemonTcgApiService = inject(PokemonTcgApiService);

  filteredSuggestions = signal<string[]>([]);
  showSuggestions = signal(false);

  private blurTimeout: any;

  ngOnInit() {
    this.nameService.getNames();
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.updateSuggestions();
    this.showSuggestions.set(value.length > 0);
  }

  onImageSearch(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
  }

  updateSuggestions() {
    const term = this.searchTerm().toLowerCase();
    const allNames = this.nameService.pokemonNames();

    if (term.length === 0 || !allNames) {
      this.filteredSuggestions.set([]);
      return;
    }

    const suggestions = allNames
      .filter((name) => name.toLowerCase().includes(term))
      .slice(0, 10);
    this.filteredSuggestions.set(suggestions);
  }

  onFocus() {
    clearTimeout(this.blurTimeout);
    this.updateSuggestions();
    this.showSuggestions.set(this.searchTerm().length > 0);
  }

  onBlur() {
    this.blurTimeout = setTimeout(() => {
      this.showSuggestions.set(false);
    }, 150);
  }

  selectSuggestion(name: string) {
    this.searchTerm.set(name);
    this.showSuggestions.set(false);
    this.filteredSuggestions.set([]);
    this.onSearch();
  }

  onSearch() {
    this.showSuggestions.set(false);
    this.pokemonTcgApiService
      .findCards(this.searchTerm())
      .subscribe((response) => {
        console.log(response);
        this.cardService.updateCards(response.data);
      });
  }
}
