import ListTransactions from "./TransactionList";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Statement() {
  const router = useRouter();
  const statement = useSelector(
    (state: any) => state.transactions.transactions
  );

  function onEditClicked() {
    router.push("/transferencias");
  }

  return (
    <div className="bg-gray-100 lg:w-[282px] rounded-lg p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-black font-bold text-[25px] text-left">Extrato</h2>
        <IconButton icon="edit" color="blue" onClick={onEditClicked} />
      </div>

      <ListTransactions
        transactions={statement?.slice(-5)?.reverse()}
        showActions={false}
      />
    </div>
  );
}
