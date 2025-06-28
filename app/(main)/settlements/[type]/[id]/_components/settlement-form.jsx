"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { CurrencySelector } from "@/app/(main)/expenses/new/_components/currency-selector";

// Form schema validation
const settlementSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a positive number",
    }),
  currency: z.string().min(1, "Currency is required"),
  note: z.string().optional(),
  paymentType: z.enum(["youPaid", "theyPaid"]),
});

export function SettlementForm({ entityType, entityId, onSuccess }) {
  const [selectedGroupMemberId, setSelectedGroupMemberId] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Get settlement data
  const { data: settlementData } = useConvexQuery(api.settlements.getSettlementData, {
    entityType,
    entityId,
  });

  // Get current user
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  // Create settlement mutation
  const createSettlement = useConvexMutation(api.settlements.createSettlement);

  // Set up form with validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      amount: "",
      currency: "USD",
      note: "",
      paymentType: "youPaid",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const amount = parseFloat(data.amount);

      if (entityType === "user") {
        // Individual settlement
        const paidByUserId =
          data.paymentType === "youPaid" ? currentUser._id : entityId;
        const receivedByUserId =
          data.paymentType === "youPaid" ? entityId : currentUser._id;

        await createSettlement.mutate({
          amount,
          currency: selectedCurrency,
          note: data.note,
          paidByUserId,
          receivedByUserId,
          groupId: undefined,
        });
      } else {
        // Group settlement
        const paidByUserId =
          data.paymentType === "youPaid" ? currentUser._id : selectedGroupMemberId;
        const receivedByUserId =
          data.paymentType === "youPaid" ? selectedGroupMemberId : currentUser._id;

        await createSettlement.mutate({
          amount,
          currency: selectedCurrency,
          note: data.note,
          paidByUserId,
          receivedByUserId,
          groupId: entityId,
        });
      }

      toast.success("Settlement recorded successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to record settlement: " + error.message);
    }
  };

  if (!settlementData || !currentUser) return null;

  // Render form for individual settlement
  if (entityType === "user") {
    const { counterpart, netBalance } = settlementData;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">{selectedCurrency === "USD" ? "$" : selectedCurrency === "INR" ? "₹" : selectedCurrency === "EUR" ? "€" : selectedCurrency === "GBP" ? "£" : selectedCurrency === "JPY" ? "¥" : selectedCurrency === "AUD" ? "A$" : selectedCurrency}</span>
            <Input
              id="amount"
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0.01"
              className="pl-7"
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <Label>Currency</Label>
          <CurrencySelector
            value={selectedCurrency}
            onChange={(currency) => {
              setSelectedCurrency(currency);
              setValue("currency", currency);
            }}
          />
          {errors.currency && (
            <p className="text-sm text-red-500">{errors.currency.message}</p>
          )}
        </div>

        {/* Payment direction */}
        <div className="space-y-2">
          <Label>Who paid?</Label>
          <RadioGroup
            defaultValue="youPaid"
            {...register("paymentType")}
            className="flex flex-col space-y-2"
            onValueChange={(value) => {
              register("paymentType").onChange({
                target: { name: "paymentType", value },
              });
            }}
          >
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="youPaid" id="youPaid" />
              <Label htmlFor="youPaid" className="flex-grow cursor-pointer">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={currentUser.imageUrl} />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>You paid {counterpart.name}</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="theyPaid" id="theyPaid" />
              <Label htmlFor="theyPaid" className="flex-grow cursor-pointer">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={counterpart.imageUrl} />
                    <AvatarFallback>
                      {counterpart.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{counterpart.name} paid you</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Note */}
        <div className="space-y-2">
          <Label htmlFor="note">Note (optional)</Label>
          <Textarea
            id="note"
            placeholder="Dinner, rent, etc."
            {...register("note")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Recording..." : "Record settlement"}
        </Button>
      </form>
    );
  }

  // Render form for group settlement
  if (entityType === "group") {
    const groupMembers = entityData.balances;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Select group member */}
        <div className="space-y-2">
          <Label>Who are you settling with?</Label>
          <div className="space-y-2">
            {groupMembers.map((member) => {
              const isSelected = selectedGroupMemberId === member.userId;
              const isOwing = member.netBalance < 0; // negative means they owe you
              const isOwed = member.netBalance > 0; // positive means you owe them

              return (
                <div
                  key={member.userId}
                  className={`border rounded-md p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedGroupMemberId(member.userId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback>
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p
                          className={`text-sm ${
                            isOwing
                              ? "text-green-600"
                              : isOwed
                              ? "text-red-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {isOwing
                            ? `They owe you ${selectedCurrency === "USD" ? "$" : selectedCurrency === "INR" ? "₹" : selectedCurrency === "EUR" ? "€" : selectedCurrency === "GBP" ? "£" : selectedCurrency === "JPY" ? "¥" : selectedCurrency === "AUD" ? "A$" : selectedCurrency}${Math.abs(member.netBalance).toFixed(2)}`
                            : isOwed
                            ? `You owe ${selectedCurrency === "USD" ? "$" : selectedCurrency === "INR" ? "₹" : selectedCurrency === "EUR" ? "€" : selectedCurrency === "GBP" ? "£" : selectedCurrency === "JPY" ? "¥" : selectedCurrency === "AUD" ? "A$" : selectedCurrency}${Math.abs(member.netBalance).toFixed(2)}`
                            : "Settled up"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedGroupMemberId && (
          <>
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">{selectedCurrency === "USD" ? "$" : selectedCurrency === "INR" ? "₹" : selectedCurrency === "EUR" ? "€" : selectedCurrency === "GBP" ? "£" : selectedCurrency === "JPY" ? "¥" : selectedCurrency === "AUD" ? "A$" : selectedCurrency}</span>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="pl-7"
                  {...register("amount")}
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <Label>Currency</Label>
              <CurrencySelector
                value={selectedCurrency}
                onChange={(currency) => {
                  setSelectedCurrency(currency);
                  setValue("currency", currency);
                }}
              />
              {errors.currency && (
                <p className="text-sm text-red-500">{errors.currency.message}</p>
              )}
            </div>

            {/* Payment direction */}
            <div className="space-y-2">
              <Label>Who paid?</Label>
              <RadioGroup
                defaultValue="youPaid"
                {...register("paymentType")}
                className="flex flex-col space-y-2"
                onValueChange={(value) => {
                  register("paymentType").onChange({
                    target: { name: "paymentType", value },
                  });
                }}
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="youPaid" id="youPaid" />
                  <Label htmlFor="youPaid" className="flex-grow cursor-pointer">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={currentUser.imageUrl} />
                        <AvatarFallback>
                          {currentUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        You paid{" "}
                        {
                          groupMembers.find(
                            (m) => m.userId === selectedGroupMemberId
                          )?.name
                        }
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="theyPaid" id="theyPaid" />
                  <Label htmlFor="theyPaid" className="flex-grow cursor-pointer">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={
                            groupMembers.find(
                              (m) => m.userId === selectedGroupMemberId
                            )?.imageUrl
                          }
                        />
                        <AvatarFallback>
                          {
                            groupMembers.find(
                              (m) => m.userId === selectedGroupMemberId
                            )?.name.charAt(0)
                          }
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {
                          groupMembers.find(
                            (m) => m.userId === selectedGroupMemberId
                          )?.name
                        }{" "}
                        paid you
                      </span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                placeholder="Dinner, rent, etc."
                {...register("note")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Recording..." : "Record settlement"}
            </Button>
          </>
        )}
      </form>
    );
  }

  return null;
}