import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionResponse,
  TransactionResult,
} from "@/shared/models/Account";
import { TransactionForm } from "@/components/layout/transacao/FormNovaTransacao";
import buildAccountService from "@/services/accountService";

interface TransactionsState {
  transactions: Transaction[];
  balance: number;
}

const initialState: TransactionsState = {
  transactions: [],
  balance: 0,
};

const reduceTransactions = (transactions: Transaction[], initial: number) => {
  return transactions.reduce((acc, cur) => acc + cur.value, initial);
};

export const getStatements = createAsyncThunk(
  "transactions/statement",
  async (accountId: string) => {
    const { getStatement } = buildAccountService();
    const response = await (<Promise<TransactionResult>>(
      getStatement(accountId)
    ));
    if (response.transactions) {
      return response.transactions;
    }
    return [];
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (data: TransactionForm, { dispatch }) => {
    const { createTransaction } = buildAccountService();
    const response = await (<Promise<TransactionResponse>>(
      createTransaction(data)
    ));
    if (response.result) {
      dispatch(getStatements(data.accountId));
      return response;
    }
    return {};
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (
    {
      transactionId,
      data,
    }: {
      transactionId: string;
      data: TransactionForm;
    },
    { dispatch }
  ) => {
    const { updateTransaction } = buildAccountService();
    const response = await (<Promise<TransactionResponse>>(
      updateTransaction(transactionId, data)
    ));
    /* if (response.result) {
      dispatch(updateBalance(response.result));
    } */
    return response;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (transactionId: string, { dispatch }) => {
    const { deleteTransaction } = buildAccountService();
    const response = await (<Promise<TransactionResponse | null>>(
      deleteTransaction(transactionId)
    ));
    if (response?.result) {
      dispatch(updateBalance(response.result));
    }

    return response;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateBalance(state, action) {
      state.balance += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatements.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.balance = reduceTransactions(action.payload, 0);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          const rest = state.transactions.filter(
            (transac) =>
              transac.id !== action.payload?.result.transactions[0].id
          );
          state.transactions = rest;
          state.balance = reduceTransactions(rest, 0);
        }
      });
  },
});

export const { updateBalance } = transactionsSlice.actions;

export default transactionsSlice.reducer;
