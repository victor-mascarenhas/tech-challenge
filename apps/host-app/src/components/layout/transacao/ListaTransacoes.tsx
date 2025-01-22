"use client";

import React, { useState } from "react";
import { ListaTransacoesOptions } from "../../../shared/models/Transaction";
import TransacaoConfirmDelete from "./TransacaoConfirmDelete";
import TransacaoItem from "./TransacaoItem";
import TransacaoEditModal from "./TransacaoEditModal";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "@/features/transactions/transactionsSlice";
import { Transaction } from "@/shared/models/Account";


export default function ListaTransacoes(options: ListaTransacoesOptions) {
  
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedTransac, setSelectedTransac] = useState<Transaction | null>(null);
  const dispatch: AppDispatch = useDispatch();  

  function handleDelete(transac: Transaction) {
    setSelectedTransac(transac);
    setConfirmDeleteIsOpen(true);
    setEditIsOpen(false);
  }

  function handleEdit(transac: Transaction) {
    setSelectedTransac(transac);
    setConfirmDeleteIsOpen(false);
    setEditIsOpen(true);
  }

  function confirmarDelete() {
    if (selectedTransac) {     
  
      dispatch(
        deleteTransaction(
          selectedTransac.id
        )
      );
      fecharModal();
    }
  }
   

  function confirmarEdit() {
    if (selectedTransac) {
      fecharModal();
    }
  }

  function fecharModal() {
    setConfirmDeleteIsOpen(false);
    setEditIsOpen(false);
    setSelectedTransac(null);
  }

  return (
    <>
      <ul className="flex flex-col gap-5 text-left pt-5">
        {options.transacoes?.length > 0 ? (
          options.transacoes.map((tran, index) => (
            <TransacaoItem
              key={tran.id || index}
              item={tran}
              showActions={options.showActions}
              onEditClicked={() => handleEdit(tran)}
              onDeleteClicked={() => handleDelete(tran)}
            />
          ))
        ) : (
          <span className="text-gray-500 text-center">Nenhuma transação encontrada</span>
        )}
      </ul>

      {options.showActions && selectedTransac && (
        <>
          <TransacaoConfirmDelete
            isOpen={confirmDeleteIsOpen}
            onClose={fecharModal}
            onConfirm={confirmarDelete}
            type={selectedTransac.type}
            value={selectedTransac.value}
            date={selectedTransac.date}
          />
          <TransacaoEditModal
            isOpen={editIsOpen}
            onClose={fecharModal}
            onConfirm={confirmarEdit}
            transaction={selectedTransac}
          />
        </>
      )}
    </>
  );
}
