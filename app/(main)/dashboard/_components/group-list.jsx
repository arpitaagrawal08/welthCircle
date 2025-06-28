"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { currencySymbols } from "@/lib/currencies";

export function GroupList({ groups }) {
  const { user } = useUser();

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No groups yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const currencySymbol = currencySymbols[group.currency] || "USD";
        const balance = group.balance || 0;
        
        return (
          <Link
            key={group.id}
            href={`/groups/${group.id}`}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {group.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-muted-foreground">
                  {group.members?.length || 0} members
                </p>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                balance > 0
                  ? "text-green-600"
                  : balance < 0
                  ? "text-red-600"
                  : ""
              }`}
            >
              {balance > 0 ? "+" : ""}{currencySymbol}{balance.toFixed(2)}
            </div>
          </Link>
        );
      })}
    </div>
  );
}