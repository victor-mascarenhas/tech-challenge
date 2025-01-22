export interface Account {
  id: string;
  type: string;
  userId: string;
}

export interface Card {
  id: string;
  accountId: string;
  type: string;
  is_blocked: boolean;
  number: string;
  dueDate: Date;
  functions: string;
  cvc: string;
  paymentDate: null;
  name: string;
}

export interface Result {
  account?: Account[];
  transactions?: Transaction[];
  cards?: Card[];
}

export interface AccountResp {
  message: string;
  result: Result;
}

export interface TransactionResponse {
  message: string;
  result: TransactionResult;
}

export interface TransactionResult {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  accountId: string;
  type: "Credit" | "Debit";
  value: number;
  date: Date;
}
