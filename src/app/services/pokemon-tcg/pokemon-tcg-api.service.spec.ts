import { TestBed } from '@angular/core/testing';

import { PokemonTcgApiService } from './pokemon-tcg-api.service';

describe('PokemonTcgApiService', () => {
  let service: PokemonTcgApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTcgApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
