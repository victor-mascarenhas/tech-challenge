"use client";

import { useEffect } from "react";
import HeaderLogado from "./HeaderLogado";
import { getAccountInfo, getTokenFromLocalStorage } from "@/features/user/userSlice";
import Router from "next/router";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutLogado({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user)
  const isAuth = !!getTokenFromLocalStorage()
    
  useEffect(() => {    
    if(!isAuth){
      Router.push("/")
    }
    if(!user.account){
      dispatch(getAccountInfo())   
    }     
  },[user.account,isAuth])

  return (
    <div className="flex flex-col overflow-hidden h-screen w-screen bg-fiap-light-green">
      <HeaderLogado userName={user?.username} />
      <div className="flex flex-col justify-between h-full w-full overflow-x-hidden overflow-y-scroll">
        <main className="flex flex-col">{children}</main>
      </div>
    </div>
  );
}
