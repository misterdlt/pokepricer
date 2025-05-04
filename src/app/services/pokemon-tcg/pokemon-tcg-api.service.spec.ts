import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PokemonTcgApiService } from './pokemon-tcg-api.service';
import { CardResponse, SingleCardResponse } from '../../models/card/card';
import { SetResponse, Set } from '../../models/set/set';

describe('PokemonTcgApiService', () => {
  let service: PokemonTcgApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://api.pokemontcg.io/v2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonTcgApiService],
    });
    service = TestBed.inject(PokemonTcgApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find cards by name', () => {
    const mockName = 'Pikachu';
    const mockResponse: CardResponse = { data: [], page: 1, pageSize: 1, count: 0, totalCount: 0 };

    service.findCards(mockName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/cards?q=name:"${mockName}"`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should find cards by name and number', () => {
    const mockName = 'Charizard';
    const mockNumber = '4';
    const mockResponse: CardResponse = { data: [], page: 1, pageSize: 1, count: 0, totalCount: 0 };

    service.findCards(mockName, mockNumber).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/cards?q=name:"${mockName}" number:"${mockNumber}"`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get a single card by ID', () => {
    const mockId = 'xy7-54';
    const mockResponse: SingleCardResponse = { data: {} as any };

    service.getCard(mockId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/cards/${mockId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get all sets', () => {
    const mockResponse: SetResponse[] = [];

    service.getSets().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/sets`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get a single set by ID', () => {
    const mockId = 'base1';
    const mockResponse: Set = {} as any;

    service.getSet(mockId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/sets/${mockId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get all types', () => {
    const mockResponse: string[] = ['Grass', 'Fire', 'Water'];

    service.getTypes().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/types`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get all rarities', () => {
    const mockResponse: string[] = ['Common', 'Uncommon', 'Rare'];

    service.getRarities().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/rarities`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should get a single rarity by ID', () => {
    const mockId = 'Rare Holo V';
    const mockResponse: string = 'Rare Holo V';

    service.getRarity(mockId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/rarities/${mockId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
