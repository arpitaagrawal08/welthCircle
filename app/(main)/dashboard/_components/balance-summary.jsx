"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { currencySymbols } from "@/lib/currencies";

export function BalanceSummary({ balances }) {
  const { user } = useUser();

  if (!balances || !balances.oweDetails) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No balances to show</p>
        </CardContent>
      </Card>
    );
  }

  const { youOwe, youAreOwedBy } = balances.oweDetails;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* You are owed */}
          {youAreOwedBy && youAreOwedBy.length > 0 && (
            <div>
              <h3 className="font-medium text-green-600 mb-3">You are owed</h3>
              <div className="space-y-3">
                {youAreOwedBy.map((item) => {
                  const currencySymbol = currencySymbols[item.currency] || "USD";
                  return (
                    <Link
                      key={item.userId}
                      href={`/person/${item.userId}`}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.imageUrl} />
                          <AvatarFallback>
                            {item.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-green-600">
                        {currencySymbol}{item.amount.toFixed(2)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* You owe */}
          {youOwe && youOwe.length > 0 && (
            <div>
              <h3 className="font-medium text-red-600 mb-3">You owe</h3>
              <div className="space-y-3">
                {youOwe.map((item) => {
                  const currencySymbol = currencySymbols[item.currency] || "USD";
                  return (
                    <Link
                      key={item.userId}
                      href={`/person/${item.userId}`}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.imageUrl} />
                          <AvatarFallback>
                            {item.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-red-600">
                        {currencySymbol}{item.amount.toFixed(2)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Show message if no balances */}
          {(!youAreOwedBy || youAreOwedBy.length === 0) && 
           (!youOwe || youOwe.length === 0) && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">You're all settled up!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}