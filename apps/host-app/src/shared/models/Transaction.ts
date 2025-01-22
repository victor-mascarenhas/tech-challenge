import { Transaction } from "./Account";

export interface ListaTransacoesOptions {
  transacoes: Transaction[];
  showActions: boolean;
  accountId: string;
}
export interface TransacaoModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "Credit" | "Debit";
  value: number;
  date: Date;
  isSubmitting?: boolean;
}
export interface TransactionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: Transaction;
}
export interface TransactionFormEditProps {
  showCancel: boolean;
  onCancelClicked: () => void;
  onConfirmClicked: () => void;
  transaction: Transaction;
}
export interface TransacaoItemOptions {
  item: Transaction;
  showActions: boolean;
  onDownloadAttachmentClicked?: { (): void };
  onEditClicked?: { (): void };
  onDeleteClicked?: { (): void };
}
