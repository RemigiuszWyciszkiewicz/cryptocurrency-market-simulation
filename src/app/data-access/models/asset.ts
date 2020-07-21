export interface Asset {
  _id: string;
  cryptocurrency: string;
  quantity: number;
  lastUpdate: string;
  purchaseCost: number;
}

export interface AssetDictionary {
  [key: string]: Asset;
}
