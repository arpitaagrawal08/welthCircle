"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ArrowLeftRight, ArrowLeft, Users } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";
import { GroupBalances } from "@/components/group-balances";
import { GroupMembers } from "@/components/group-members";
import { useUser } from "@clerk/nextjs";
import { currencySymbols } from "@/lib/currencies";

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");
  const { user } = useUser();

  const { data: group, isLoading: groupLoading } = useConvexQuery(
    api.groups.getGroup,
    { groupId: params.id }
  );

  const { data: expenses, isLoading: expensesLoading } = useConvexQuery(
    api.expenses.getGroupExpenses,
    { groupId: params.id }
  );

  const { data: settlements, isLoading: settlementsLoading } = useConvexQuery(
    api.settlements.getGroupSettlements,
    { groupId: params.id }
  );

  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.groups.getGroupBalances,
    { groupId: params.id }
  );

  const isLoading = groupLoading || expensesLoading || settlementsLoading || balancesLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <p className="text-muted-foreground">Group not found</p>
        </div>
      </div>
    );
  }

  const currencySymbol = currencySymbols[expenses[0]?.currency] || "USD";

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <Users className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{group.name}</h1>
              <p className="text-muted-foreground">
                {group.members?.length || 0} members
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/settlements/group/${params.id}`}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Settle up
            </Link>
          </Button>
          <Button asChild>
            <Link href="/expenses/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add expense
            </Link>
          </Button>
        </div>
      </div>

      {/* Group balances */}
      <GroupBalances group={group} balances={balances} />

      {/* Expenses and settlements */}
      <Tabs
        defaultValue="expenses"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">
            Expenses ({expenses?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="settlements">
            Settlements ({settlements?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseList
            expenses={expenses || []}
            showOtherPerson={false}
            isGroupExpense={true}
          />
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <SettlementList
            settlements={settlements || []}
            isGroupSettlement={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}