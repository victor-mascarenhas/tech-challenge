import {
  AccountResp,
  Result,
  TransactionResponse,
} from "@/shared/models/Account";
import { buildAxiosService } from "./axiosService";

const buildAccountService = () => {
  const { get, post, put, del } = buildAxiosService();

  const getAccount = async (): Promise<Result> => {
    try {
      const resp = await get<AccountResp>("/account");
      return resp.data.result;
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  const getStatement = async (accountId: string) => {
    try {
      const resp = await get<TransactionResponse>(
        `/account/${accountId}/statement`
      );
      return resp.data.result;
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  const createTransaction = async (data: {
    accountId: string;
    value: number;
    type: "Credit" | "Debit";
  }) => {
    try {
      const resp = await post<TransactionResponse>(
        `/account/transaction`,
        JSON.stringify(data)
      );
      return resp.data.result;
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  const updateTransaction = async (
    transactionId: string,
    data: {
      accountId: string;
      value: number;
      type: "Credit" | "Debit";
    }
  ) => {
    try {
      const resp = await put<TransactionResponse>(
        `/account/transaction/${transactionId}`,
        JSON.stringify(data)
      );
      return resp.data.result;
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    try {
      const resp = await del(`/account/transaction/${transactionId}`);
      return resp.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    getAccount,
    getStatement,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
export default buildAccountService;
