"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { currencySymbols } from "@/lib/currencies";

export function GroupBalances({ group, balances }) {
  const { user } = useUser();

  if (!balances || balances.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Group Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No balances to show</p>
        </CardContent>
      </Card>
    );
  }

  // Find current user's balance
  const me = balances.find((member) => member.userId === user?.id);
  const otherMembers = balances.filter((member) => member.userId !== user?.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current user's balance */}
          {me && (
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium mb-2">Your balance</h3>
              <div
                className={`text-2xl font-bold ${
                  me.totalBalance > 0
                    ? "text-green-600"
                    : me.totalBalance < 0
                    ? "text-red-600"
                    : ""
                }`}
              >
                {me.totalBalance > 0
                  ? `+${currencySymbols[me.currency] || me.currency}${me.totalBalance.toFixed(2)}`
                  : me.totalBalance < 0
                  ? `-${currencySymbols[me.currency] || me.currency}${Math.abs(me.totalBalance).toFixed(2)}`
                  : `${currencySymbols[me.currency] || me.currency}0.00`}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {me.totalBalance > 0
                  ? "You are owed money"
                  : me.totalBalance < 0
                  ? "You owe money"
                  : "All settled up!"}
              </p>
            </div>
          )}

          {/* Other members' balances */}
          <div>
            <h3 className="font-medium mb-3">Other members</h3>
            <div className="space-y-3">
              {otherMembers.map((member) => {
                const currencySymbol = currencySymbols[member.currency] || member.currency;
                return (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback>
                          {member.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.amount > 0
                            ? `You owe ${currencySymbol}${member.amount.toFixed(2)}`
                            : member.amount < 0
                            ? `They owe ${currencySymbol}${Math.abs(member.amount).toFixed(2)}`
                            : "Settled up"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${
                          member.totalBalance > 0
                            ? "text-green-600"
                            : member.totalBalance < 0
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {member.totalBalance > 0
                          ? `+${currencySymbol}${member.totalBalance.toFixed(2)}`
                          : member.totalBalance < 0
                          ? `-${currencySymbol}${Math.abs(member.totalBalance).toFixed(2)}`
                          : `${currencySymbol}0.00`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}