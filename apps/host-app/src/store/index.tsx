import { configureStore } from "@reduxjs/toolkit";
import user from "../features/user/userSlice"
import transactions from "../features/transactions/transactionsSlice"

const store = configureStore({
    reducer: {
        user,
        transactions
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;