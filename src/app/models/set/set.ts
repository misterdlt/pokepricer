export interface SetResponse {
  data: Set;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface Legalities {
  unlimited: string;
  standard?: string;
  expanded?: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}
