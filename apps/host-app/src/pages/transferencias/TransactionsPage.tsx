import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/index";
import Button from "@/components/ui/Button";
import { ButtonColors } from "@/shared/types/Button";
import Input from "@/components/forms/Input";
import TransactionList from "../../components/Cards/TransactionList";
import {
  filterTransactions,
  getStatements,
  updateFilteredTransactions,
} from "@/features/transactions/transactionsSlice";
import { getAccountInfo } from "@/features/user/userSlice";

const TRANSACTIONS_PER_PAGE = 5;
type filterTypes = "None" | "Credit" | "Debit";
type filterParamsType = {
  startDate: string;
  endDate: string;
  filter: filterTypes;
};

export default function TransactionsPage() {
  const [filterParams, setFilterParams] = useState<filterParamsType>({
    startDate: "",
    endDate: "",
    filter: "None",
  });
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user);
  const accountInfo = userInfo.account?.account![0];
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  const transactionList = transactionsState.filteredTransactions.items;
  const actualFilter = transactionsState.filteredTransactions.filter;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactionList.length / TRANSACTIONS_PER_PAGE);
  const displayedTransactions = transactionList.slice(
    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE
  );

  useEffect(() => {
    if (accountInfo) {
      dispatch(getStatements(accountInfo.id));
    } else {
      dispatch(getAccountInfo());
    }
  }, [dispatch, accountInfo]);

  useEffect(() => {
    setCurrentPage(1);
  }, [actualFilter]);

  useEffect(() => {
    if (transactionList.length < 1) {
      dispatch(updateFilteredTransactions());
    }
    dispatch(filterTransactions(filterParams));
  }, [dispatch, filterParams]);

  function handleOnChange(field: string, value: any) {
    setFilterParams({ ...filterParams, [field]: value });
  }

  const handlePaginaChange = (pagina: number) => {
    setCurrentPage(pagina);
  };

  function getButtonColor(tipo: filterTypes): ButtonColors {
    return tipo === actualFilter ? "blue" : "gray";
  }

  const renderPaginationButtons = () => {
    const maxVisibleButtons = 3;
    const buttons = [];

    let startButton = Math.max(
      currentPage - Math.floor(maxVisibleButtons / 2),
      1
    );
    const endButton = Math.min(startButton + maxVisibleButtons - 1, totalPages);

    if (endButton - startButton < maxVisibleButtons - 1) {
      startButton = Math.max(endButton - maxVisibleButtons + 1, 1);
    }

    if (startButton > 1) {
      buttons.push(
        <Button
          key={1}
          text="1"
          color={1 === currentPage ? "blue" : "gray"}
          onClick={() => handlePaginaChange(1)}
        />
      );
      if (startButton > 2) {
        buttons.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let pagina = startButton; pagina <= endButton; pagina++) {
      buttons.push(
        <Button
          key={pagina}
          text={String(pagina)}
          color={pagina === currentPage ? "blue" : "gray"}
          onClick={() => handlePaginaChange(pagina)}
        />
      );
    }

    if (endButton < totalPages) {
      if (endButton < totalPages - 1) {
        buttons.push(<span key="ellipsis-end">...</span>);
      }
      buttons.push(
        <Button
          key={totalPages}
          text={String(totalPages)}
          color={totalPages === currentPage ? "blue" : "gray"}
          onClick={() => handlePaginaChange(totalPages)}
        />
      );
    }

    return buttons;
  };

  return (
    <div className="bg-fiap-white shadow-md rounded-lg p-6 w-126">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Transferências</h2>
      </div>

      <div className="flex flex-col bg-white border-[1px] rounded border-fiap-light-blue px-4 pt-3 pb-5">
        <span className="pb-3">Filtros</span>

        <div className="flex max-sm:flex-col gap-2 mb-4">
          <Button
            text="Todos"
            color={getButtonColor("None")}
            onClick={() => {
              handleOnChange("filter", "None");
            }}
          />
          <Button
            text="Depósitos"
            color={getButtonColor("Credit")}
            onClick={() => {
              handleOnChange("filter", "Credit");
            }}
          />
          <Button
            text="Transferências"
            color={getButtonColor("Debit")}
            onClick={() => {
              handleOnChange("filter", "Debit");
            }}
          />
        </div>

        <div className="flex max-sm:flex-col w-full gap-4">
          <Input
            type="date"
            value={filterParams.startDate}
            label="Data início:"
            labelTextBold={false}
            name="dataInicio"
            onValueChanged={(value) => {
              handleOnChange("startDate", value);
            }}
          />
          <Input
            type="date"
            value={filterParams.endDate}
            label="Data fim:"
            labelTextBold={false}
            name="dataFim"
            onValueChanged={(value) => {
              handleOnChange("endDate", value);
            }}
          />
        </div>
      </div>

      <TransactionList
        transactions={displayedTransactions}
        showActions={true}
      />

      <div className="flex justify-center mt-4">
        {renderPaginationButtons()}
      </div>
    </div>
  );
}
