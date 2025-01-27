import { Transaction } from "./Account";

export interface ListTransactionsProps {
  transactions: Transaction[];
  showActions: boolean;
}
export interface TransactionDeleteModalProps {
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
export interface TransactionItemProps {
  item: Transaction;
  showActions: boolean;
  onDownloadAttachmentClicked?: { (): void };
  onEditClicked?: { (): void };
  onDeleteClicked?: { (): void };
}
