"use client";

import IconButton from "@/components/ui/IconButton";
import { FormatoData } from "@/shared/types/FormatoData";
import { formatarData, formatarMoeda } from "@/shared/utils/Formatters";
import { TransactionItemProps } from "@/shared/models/Transaction";

export default function TransactionItem(options: TransactionItemProps) {
  const { item } = options;
  const mes = formatarData(new Date(item.date), FormatoData.MES);
  const date = formatarData(new Date(item.date));
  const valor = formatarMoeda(item.value);

  const transactionTypes: { [key: string]: string } = {
    Credit: "Depósito",
    Debit: "Transferência",
  };

  function onDeleteClicked() {
    if (options.onDeleteClicked) options.onDeleteClicked();
  }

  function onEditClicked() {
    if (options.onEditClicked) options.onEditClicked();
  }

  return (
    <li className="list-none pb-4 border-b border-fiap-green/50">
      <p className="text-sm font-semibold text-fiap-green capitalize">{mes}</p>
      <div className="flex items-center justify-between">
        <h3 className="pr-2">{transactionTypes[item.type]}</h3>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>

      <div
        className={`flex justify-between items-center ${options.showActions ? "mt-2" : ""}`}
      >
        <p className="text-gray-800 font-semibold text-lg">{valor}</p>
        <div
          className={`flex items-center gap-2 ${!options.showActions ? "hidden" : ""}`}
        >
          <IconButton icon="edit" color="blue" onClick={onEditClicked} />
          <IconButton icon="delete" color="blue" onClick={onDeleteClicked} />
        </div>
      </div>
    </li>
  );
}
