"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem("currency");
    if (stored) setCurrency(stored);
  }, []);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside CurrencyProvider");
  return context;
};
