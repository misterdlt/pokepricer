export interface CardResponse {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface SingleCardResponse {
  data: Card;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo?: string[];
  rules?: string[];
  attacks?: Attack[];
  weaknesses?: TypeValue[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer?: TcgPlayer;
  cardmarket?: Cardmarket;
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: CardmarketPriceDetails;
}
export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface TypeValue {
  type: string;
  value: string;
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
  expanded?: string;
  standard?: string;
}

export interface Images {
  small: string;
  large: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface TcgPlayer {
  url: string;
  updatedAt: string;
  prices: {
    [key: string]: TcgPlayerPriceDetails;
  };
}

export interface TcgPlayerPriceDetails {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export interface CardmarketPriceDetails {
  averageSellPrice: number;
  avg1: number;
  avg7: number;
  avg30: number;
  germanProLow: number;
  lowPrice: number;
  lowPriceExPlus: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
  reverseHoloLow: number;
  reverseHoloSell: number;
  reverseHoloTrend: number;
  suggestedPrice: number;
  trendPrice: number;
}
