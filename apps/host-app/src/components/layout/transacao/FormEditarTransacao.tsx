"use client";

import Input from "@/components/forms/Input";
import InputSelect from "@/components/forms/InputSelect";
import { InputSelectOption } from "@/shared/models/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateTransaction } from "@/features/transactions/transactionsSlice";
import { TransactionFormEditProps } from "@/shared/models/Transaction";
import { Transaction } from "@/shared/models/Account";

export default function FormEditarTransacao(options: TransactionFormEditProps) {
  const [data, setData] = useState<Transaction>(options.transaction);
  const dispatch = useDispatch<AppDispatch>();

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "Debit", label: "Transferência" },
    { value: "Credit", label: "Depósito" },
  ];

  function onCancelClicked() {
    if (options.onCancelClicked) options.onCancelClicked();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    confirmarTransacao();
  };

  const handleChange = (name: string, value: string | number) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const confirmarTransacao = async () => {

    try {
      const result = await dispatch(
        updateTransaction({transactionId: data.id,data})
      );

      if (result.meta.requestStatus === "fulfilled") {
        alert("Transação atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar a transação.");
      }
    } catch (error) {
      console.error("Erro ao confirmar transação:", error);
      alert("Erro ao realizar a operação. Tente novamente.");
    }

    if (options.onConfirmClicked) options.onConfirmClicked();
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputSelect
          name="tipoTransacao"
          label="Tipo"
          options={tiposTransacao}
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
        <Input
          name="date"
          type="date"
          label="Data"
          style="dark"
          value={data.date.toISOString()}
          onValueChanged={(value) => handleChange("date", value)}
        />      

        <div className="flex gap-4">
          {options.showCancel && <Button type="button" text="Cancelar" color="red" onClick={onCancelClicked} />}
          <Button type="submit" text="Atualizar transação" color="blue" />
        </div>
      </form>
    </>
  );
}
