import buildAuthService from "@/services/authService";
import Router from "next/router";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import buildAccountService from "@/services/accountService";
import { Result } from "@/shared/models/Account";
import { getStatements } from "../transactions/transactionsSlice";

export interface UserLocalStorage {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuth: boolean;
}

export interface UserState extends UserLocalStorage {
  account: Result | null;
}
interface credentials {
  email: string;
  password: string;
}

export const getFromLocalStorage = (): UserLocalStorage => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    if (token && username && email) {
      return {
        isAuth: true,
        token: JSON.parse(token) || null,
        username: JSON.parse(username) || null,
        email: JSON.parse(username) || null,
      };
    }
  }
  console.error("Erro ao analisar o token do localStorage");
  return {
    isAuth: false,
    token: null,
    username: null,
    email: null,
  };
};

const initialState: UserState = {
  token: "",
  username: null,
  email: null,
  account: null,
  isAuth: false,
};

export const signIn = createAsyncThunk<
  { token: string | null; username: string | null; email: string | null },
  credentials
>("user/signIn", async (credentials) => {
  const { auth } = buildAuthService();
  const response = await auth(credentials);
  if (response.token) {
    localStorage.setItem("token", JSON.stringify(response.token));
    localStorage.setItem("username", JSON.stringify(response.username));
    localStorage.setItem("email", JSON.stringify(credentials.email));
    return { ...response, email: credentials.email };
  }
  return { token: null, username: null, email: null };
});

export const getAccountInfo = createAsyncThunk<Result | undefined>(
  "user/account",
  async (_, { dispatch }) => {
    const { getAccount } = buildAccountService();
    const response = await getAccount();
    if (response.account) {
      dispatch(getStatements(response.account[0].id));
    }
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
      Router.push("/");
    },
    login(state) {
      state.token = getFromLocalStorage().token;
      state.username = getFromLocalStorage().username;
      state.email = getFromLocalStorage().email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.email = action.payload.email;
        if (action.payload.token) {
          Router.push("/home");
        }
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        if (action.payload?.account) {
          state.account = action.payload;
        }
      });
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
