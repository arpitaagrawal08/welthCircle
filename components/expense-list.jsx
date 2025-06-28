"use client";

import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/lib/expense-categories";
import { getCategoryIcon } from "@/lib/expense-categories";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { currencySymbols } from "@/lib/currencies";

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  if (!expenses || !expenses.length) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No expenses found
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up from expense
  const getUserDetails = (userId) => {
    // For the group context, we need to look up members from somewhere else
    // This is a simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  // Check if the user can delete an expense (creator or payer)
  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  // Handle delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense.mutate({ expenseId });
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const payer = getUserDetails(expense.paidByUserId, expense);
        const isCurrentUserPayer = expense.paidByUserId === currentUser?._id;
        const category = getCategoryById(expense.category);
        const CategoryIcon = getCategoryIcon(category.id);
        const showDeleteOption = canDeleteExpense(expense);
        const currencySymbol = currencySymbols[expense.currency] || expense.currency;

        return (
          <Card key={expense._id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{expense.description}</h3>
                    {expense.category && (
                      <Badge variant="secondary" className="text-xs">
                        {expense.category}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{format(new Date(expense.date), "MMM d, yyyy")}</span>
                    <span>•</span>
                    <span>
                      Paid by {isCurrentUserPayer ? "you" : payer.name}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-bold text-lg">
                        {currencySymbol}{expense.amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {expense.splits.map((split) => {
                        const splitUser = getUserDetails(split.userId, expense);
                        const isCurrentUser = split.userId === currentUser?._id;
                        const shouldShow =
                          showOtherPerson ||
                          (!showOtherPerson &&
                            (split.userId === currentUser?._id ||
                              split.userId === otherPersonId));

                        if (!shouldShow) return null;

                        return (
                          <div
                            key={split.userId}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={splitUser.imageUrl} />
                                <AvatarFallback>
                                  {splitUser.name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                {isCurrentUser ? "You" : splitUser.name}: {currencySymbol}
                              </span>
                            </div>
                            <span className="font-medium">
                              {split.amount.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {showDeleteOption && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}