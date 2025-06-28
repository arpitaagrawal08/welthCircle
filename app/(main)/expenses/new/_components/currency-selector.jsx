"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencyList } from "@/lib/currencies";

export function CurrencySelector({ value, onChange }) {
  const [selectedCurrency, setSelectedCurrency] = useState(value || "USD");

  const handleCurrencyChange = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    if (onChange) {
      onChange(currencyCode);
    }
  };

  return (
    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencyList.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span>{currency.symbol}</span>
              <span>{currency.code}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 