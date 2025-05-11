import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";

interface IAccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
}
export function AccountCard({ color, balance, type, name }: IAccountCardProps) {
  return (
    <div
      style={{ borderColor: color }}
      className="p-4 bg-white border rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span className="text-gray-800 font-medium  tracking-[-0.5px]  block">
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 font-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
