import { useGetCountryInfo, useGetCurrency } from "@/app/hooks/hooks";
import { formatNumber } from "@/utils/utils";
import { useSearchParams } from "next/navigation";

/**
 * Renders a price component displaying a salary range.
 *
 * @param salary - The base salary amount
 * @param type - The job type
 * @param country - The country to convert the salary to the local currency
 *
 * Uses hooks to get country currency info and exchange rate.
 * Formats the salary with the currency symbol and exchange rate.
 * Renders the base salary and salary range in local currency.
 */
export const Price = ({
  salary,
  type,
  country,
}: {
  salary: number;
  type: string;
  country: string;
}) => {
  const params = useSearchParams();
  const searchCountry = params.get("country");
  const symbol = useGetCountryInfo(
    searchCountry?.trim() === "" || searchCountry === null
      ? (country as string)
      : searchCountry
  );
  const currency = useGetCurrency(symbol.data?.iso_code);
  const price = currency?.data ? currency.data.toFixed(0) : 1;
  return (
    <div className="flex flex-wrap flex-row gap-2 mt-2">
      <div className="rounded-2xl flex items-center gap-2 h-fit dark:text-white bg-[#73c47e]/50 w-fit p-1 text-green-800 font-bold border-2 border-black">
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
      <div className="rounded-2xl flex items-center h-fit gap-2 dark:text-white bg-[#73c47e]/50 w-fit p-1 text-green-800 font-bold border-2 border-black">
        <span className="text-sm">{type}</span>
      </div>
    </div>
  );
};
