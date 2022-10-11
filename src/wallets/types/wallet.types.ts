export interface IWallet {
  id: string;
  userId: string;
  balance: number;
  PND: boolean;
  PNC: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Wallet {
  id: string;
  userId: string;
  balance: number;
  PND: boolean;
  PNC: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWalletQuery {
  id: string;
  userId: string;
}

export interface IWalletUpdateQuery {
  balance: number;
  PND: boolean;
  PNC: boolean;
}
