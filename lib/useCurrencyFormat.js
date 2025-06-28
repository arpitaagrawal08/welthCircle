import { useCurrency } from "@/context/CurrencyContext";
import { currencySymbols } from "@/lib/currencies";

export function useCurrencyFormat() {
  const { currency } = useCurrency();

  const format = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "";

    const symbol = currencySymbols[currency] || currency;

    return `${symbol} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return { currency, format };
}
