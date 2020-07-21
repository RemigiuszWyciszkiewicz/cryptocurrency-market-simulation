export interface Asset {
  _id: string;
  cryptocurrency: string;
  amount: number;
  lastUpdate: string;
  purchaseCost: number;
}

export interface AssetDictionary {
  [key: string]: Asset;
}
