import { useCurrency } from "@/context/CurrencyContext";
import { currencySymbols } from "@/lib/currencies";

export function useCurrencyFormat() {
  const { currency } = useCurrency();

  const format = (amount) => {
    const symbol = currencySymbols[currency] || currency;
    return `${symbol} ${amount.toFixed(2)}`;
  };

  return { currency, format };
}
