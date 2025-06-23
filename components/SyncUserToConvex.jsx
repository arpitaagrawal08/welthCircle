// components/SyncUserToConvex.tsx
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function SyncUserToConvex() {
  const { isSignedIn } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isSignedIn) {
      storeUser({});
    }
  }, [isSignedIn, storeUser]);

  return null;
}
