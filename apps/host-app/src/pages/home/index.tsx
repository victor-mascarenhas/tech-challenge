"use client";

import Aside from "@/components/layout/Aside";
import CreateTransaction from "@/components/Cards/CreateTransaction";
import Statement from "@/components/Cards/Statement";
import Balance from "@/components/Cards/Balance";
import AuthLayout from "@/components/layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { getStatements } from "@/features/transactions/transactionsSlice";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: any) => state.user);
  const accountInfo = userInfo.account?.account[0];
  const balance = useSelector((state: any) => state.transactions.balance);

  useEffect(() => {
    if (accountInfo) {
      dispatch(getStatements(accountInfo.id));
    }
  }, [dispatch, accountInfo]);

  return (
    <AuthLayout>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">
          <Balance balance={balance} username={userInfo?.username} />
          <CreateTransaction />
        </div>
        <Statement />
      </div>
    </AuthLayout>
  );
}
