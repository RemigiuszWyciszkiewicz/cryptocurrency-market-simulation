import { ID } from '@datorama/akita';

export interface Asset {
  _id: ID;
  cryptocurrency: string;
  quantity: number;
  lastUpdate: string;
  purchaseCost: number;
}

export interface AssetDictionary {
  [key: string]: Asset;
}
