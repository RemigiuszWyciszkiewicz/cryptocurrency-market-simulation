export interface Asset {
  id: string;
  value: number;
  quantity: number;
  icon: number;
  purchaseCost: number;
}
export interface AssetDictionary {
  [key: string]: Asset;
}
