import { useGetCountryInfo, useGetCurrency } from "@/app/hooks/hooks";
import { formatNumber } from "@/utils/utils";

export const Price = ({
  salary,
  type,
  country,
}: {
  salary: number;
  type: string;
  country: string;
}) => {
  const symbol = useGetCountryInfo(country as string);
  const currency = useGetCurrency(symbol.data?.iso_code);
  const price = currency?.data ? currency.data.toFixed(0) : 1;
  return (
    <div className="flex flex-row gap-2 mt-2">
      <div className="flex items-center gap-2 h-fit dark:text-white bg-[#73c47e]/50 rounded-sm w-fit p-1 text-green-800 font-bold border-2 border-black">
        <span className="text-sm">
          {symbol.data?.symbol ? symbol.data.symbol : "$"}
          {formatNumber(salary * Number(price))}
        </span>
        -
        <span className="text-sm">
          {symbol.data?.symbol ? symbol.data.symbol : "$"}
          {formatNumber((salary + 500) * Number(price))} a month
        </span>
      </div>
      <div className="flex items-center h-fit gap-2 dark:text-white bg-[#73c47e]/50 rounded-sm w-fit p-1 text-green-800 font-bold border-2 border-black">
        <span className="text-sm">{type}</span>
      </div>
    </div>
  );
};
