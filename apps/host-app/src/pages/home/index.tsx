"use client";

import Aside from "@/components/layout/Aside";
import CardNovaTransacao from "@/components/layout/transacao/CardNovaTransacao";
import Extrato from "@/components/layout/transacao/Extrato";
import Saldo from "@/components/layout/transacao/Saldo";
import LayoutLogado from "@/components/layout/LayoutLogado";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { getStatements } from "@/features/transactions/transactionsSlice";

export default function Index() {  
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: any) => state.user)
  const accountInfo = userInfo.account?.account[0]
  const balance = useSelector((state: any) => state.transactions.balance)


  useEffect(() => {
    if(accountInfo){
      dispatch(getStatements(accountInfo.id));
    }
  }, [dispatch, accountInfo]);
  
  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">
          <Saldo balance={balance} username={userInfo?.username} />
          <CardNovaTransacao />
        </div>
        <Extrato accountId={accountInfo?.id as string}/>
      </div>
    </LayoutLogado>
  );
}