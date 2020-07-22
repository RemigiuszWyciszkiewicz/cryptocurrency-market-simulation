import { ID } from '@datorama/akita';

export interface Transaction {
  _id: ID;
  date: string;
  quantity: number;
  price: number;
  cryptocurrency: string;
  type: TransactionType;
  value: number;
}

export enum TransactionType {
  SALE = 'sale',
  PURCHASE = 'purchase',
}
