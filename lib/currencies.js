export const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
};

export const currencyList = Object.entries(currencySymbols).map(
  ([code, symbol]) => ({
    code,
    symbol,
    label: `${symbol} ${code}`,
  })
);
