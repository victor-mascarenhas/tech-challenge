import buildAuthService from "@/services/authService";
import Router from "next/router";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import buildAccountService from "@/services/accountService";
import { Result } from "@/shared/models/Account";

interface userState {
  token: string | null;
  username: string | null;
  email: string | null;
  account: Result | null;
}
interface credentials {
  email: string;
  password: string;
}

export const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return JSON.parse(token);
      } catch (error) {
        console.error("Erro ao analisar o token do localStorage:", error);
      }
    }
  }
  return null;
};

const isAuth = !!getTokenFromLocalStorage();

const initialState: userState = {
  token: getTokenFromLocalStorage(),
  username: null,
  email: null,
  account: null,
};

export const signIn = createAsyncThunk<
  { token: string | null; username: string | null; email: string | null },
  credentials
>("user/signIn", async (credentials) => {
  const { auth } = buildAuthService();
  const response = await auth(credentials);
  if (response.token) {
    localStorage.setItem("token", JSON.stringify(response.token));
    return { ...response, email: credentials.email };
  }
  return { token: null, username: null, email: null };
});

export const getAccountInfo = createAsyncThunk<Result | undefined>(
  "user/account",
  async () => {
    const { getAccount } = buildAccountService();
    const response = await getAccount();
    return response;
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
      Router.push("/");
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

export const { logout } = userSlice.actions;

export default userSlice.reducer;
