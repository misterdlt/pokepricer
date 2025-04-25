import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, CardResponse, SingleCardResponse } from '../../models/card/card';
import { SetResponse, Set } from '../../models/set/set';
@Injectable({
  providedIn: 'root',
})
export class PokemonTcgApiService {
  private readonly apiUrl = 'https://api.pokemontcg.io/v2';

  constructor(private http: HttpClient) {}

  findCards(name: string): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${this.apiUrl}/cards?q=name:${name}`);
  }

  getCard(id: string): Observable<SingleCardResponse> {
    return this.http.get<SingleCardResponse>(`${this.apiUrl}/cards/${id}`);
  }

  getSets(): Observable<SetResponse[]> {
    return this.http.get<SetResponse[]>(`${this.apiUrl}/sets`);
  }

  getSet(id: string): Observable<Set> {
    return this.http.get<Set>(`${this.apiUrl}/sets/${id}`);
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`);
  }

  getRarities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/rarities`);
  }

  getRarity(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/rarities/${id}`);
  }

}
