"use client";
import { useEffect, useState } from "react";
import InputSelect from "@/components/forms/InputSelect";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import { InputSelectOption } from "@/shared/models/Input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createTransaction } from "@/features/transactions/transactionsSlice";
import { useSelector } from "react-redux";

export interface TransactionForm  {
  accountId: string;
  type: "Credit" | "Debit";
  value: number;
};

export default function FormNovaTransacao() {
  const [data, setData] = useState<TransactionForm>({
    accountId: '',
    type: "Credit",
    value: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: any) => state.user)
  const accountInfo = userInfo.account?.account[0]

  useEffect(() => {
    if(accountInfo){
      handleChange('accountId',accountInfo.id)
    }
    
  },[accountInfo])

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(createTransaction(data)) 
      resetForm();

    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação. Tente novamente mais tarde.");
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setData((prevData) => ({
      ...prevData,            
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData({
      accountId: '',
    type: "Credit",
    value: 0,
    });
  };

  const inputOptions: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "Debit", label: "Transferência" },
    { value: "Credit", label: "Depósito" },
  ];

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputSelect
        name="tipoTransacao"
        label="Tipo"
        options={inputOptions}
        style="dark"
        value={data.type}
        onValueChanged={(value) => handleChange("type", value)}
      />
      <Input
        name="valor"
        type="number"
        label="Valor"
        style="dark"
        value={data.value}
        onValueChanged={(value) => handleChange("value", Number(value))}
      />

      <Button type="submit" text="Adicionar Transação" color="blue" />
    </form>
  );
}
