import { ID } from '@datorama/akita';

export interface Cryptocurrency {
  id: ID;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkLineData: number[][];
}
