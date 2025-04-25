import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameServiceService {
  constructor(private http: HttpClient) {}

  pokemonNames = signal<string[]>([]);

  getNames() {
    this.http
      .get('./assets/pokemon-names.txt', { responseType: 'text' })
      .subscribe((data) => {
        this.pokemonNames.set(
          data.split('\n').map((name) => name.replace('\r', ''))
        );
      });
  }
}
