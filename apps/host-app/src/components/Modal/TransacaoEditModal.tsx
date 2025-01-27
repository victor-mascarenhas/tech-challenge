import Modal from "@/components/ui/Modal";
import React from "react";
import EditTransactionForm from "../forms/EditTransactionForm";
import { TransactionEditModalProps } from "@/shared/models/Transaction";

export default function TransacaoEditModal(options: TransactionEditModalProps) {
  return (
    <Modal isOpen={options.isOpen} childrenClassName="w-[400px]">
      <h3 className="text-lg font-semibold mb-4">Editar transação</h3>
      <EditTransactionForm
        transaction={options.transaction}
        showCancel={true}
        onCancelClicked={options.onClose}
        onConfirmClicked={options.onConfirm}
      />
    </Modal>
  );
}
