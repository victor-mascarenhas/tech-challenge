"use client";

import React, { useState } from "react";
import { ListTransactionsProps } from "../../shared/models/Transaction";
import TransactionDeleteModal from "../Modal/TransactionDeleteModal";
import TransactionItem from "./TransactionItem";
import TransacaoEditModal from "../Modal/TransacaoEditModal";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "@/features/transactions/transactionsSlice";
import { Transaction } from "@/shared/models/Account";

export default function ListTransactions(options: ListTransactionsProps) {
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedTransac, setSelectedTransac] = useState<Transaction | null>(
    null
  );
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

  function confirmedDeletion() {
    if (selectedTransac) {
      dispatch(deleteTransaction(selectedTransac.id));
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
        {options.transactions?.length > 0 ? (
          options.transactions.map((tran, index) => (
            <TransactionItem
              key={tran.id || index}
              item={tran}
              showActions={options.showActions}
              onEditClicked={() => handleEdit(tran)}
              onDeleteClicked={() => handleDelete(tran)}
            />
          ))
        ) : (
          <span className="text-gray-500 text-center">
            Nenhuma transação encontrada
          </span>
        )}
      </ul>

      {options.showActions && selectedTransac && (
        <>
          <TransactionDeleteModal
            isOpen={confirmDeleteIsOpen}
            onClose={fecharModal}
            onConfirm={confirmedDeletion}
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
