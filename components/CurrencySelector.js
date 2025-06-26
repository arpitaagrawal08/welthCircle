"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { currencyList } from "@/lib/currencies";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="text-sm border px-3 py-1 rounded-md bg-white dark:bg-zinc-800 dark:text-white"
    >
      {currencyList.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.label}
        </option>
      ))}
    </select>
  );
}
