export interface Transactions {
  id: string;
  amount: number;
  title: string;
  fromAccount: string;
  toAccount: string;
}

export interface ICreateTransaction {
  amount: number;
  title: string;
  fromAccount: string;
  toAccount: string;
}

export interface ITransactions {
  id: string;
  amount: number;
  title: string;
  fromAccount: string;
  toAccount: string;
}
