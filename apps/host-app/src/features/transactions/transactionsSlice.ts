import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionResponse,
  TransactionResult,
} from "@/shared/models/Account";
import { TransactionForm } from "@/components/forms/CreateTransactionForm";
import buildAccountService from "@/services/accountService";
import { getAccountInfo } from "../user/userSlice";

export interface TransactionsState {
  transactions: Transaction[];
  filteredTransactions: {
    filter: "None" | "Credit" | "Debit";
    items: Transaction[];
  };
  balance: number;
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: {
    filter: "None",
    items: [],
  },
  balance: 0,
};

const reduceTransactions = (transactions: Transaction[], initial: number) => {
  return transactions.reduce((acc, cur) => acc + cur.value, initial);
};

export const getStatements = createAsyncThunk(
  "transactions/statement",
  async (accountId: string, { dispatch }) => {
    const { getStatement } = buildAccountService();
    const response = await (<Promise<TransactionResult>>(
      getStatement(accountId)
    ));
    if (response.transactions) {
      dispatch(updateFilteredTransactions());
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
    dispatch(getAccountInfo());
    return response;
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
    dispatch(getAccountInfo());

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
    dispatch(getAccountInfo());

    return response;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateFilteredTransactions(state) {
      state.filteredTransactions.items = state.transactions;
    },
    updateBalance(state, action) {
      state.balance += action.payload;
    },
    filterTransactions(state, action) {
      const filter = action.payload.filter;
      state.filteredTransactions.filter = filter;

      const endDate = action.payload.endDate
        ? new Date(action.payload.endDate)
        : new Date();
      const startDate = action.payload.startDate;
      const allTransactions = state.transactions;

      state.filteredTransactions.items = allTransactions.filter((transac) => {
        const typeFilter = filter === "None" || transac.type === filter;

        const dateFilter =
          (!startDate || new Date(transac.date) >= new Date(startDate)) &&
          (!action.payload.endDate || new Date(transac.date) <= endDate);

        return typeFilter && dateFilter;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatements.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.balance = reduceTransactions(action.payload, 0);
    });
  },
});

export const { updateBalance, filterTransactions, updateFilteredTransactions } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
