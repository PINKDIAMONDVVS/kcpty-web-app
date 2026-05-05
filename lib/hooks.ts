"use client";

import { useEffect } from "react";
import { toast } from "sonner";

/* Fire a sonner error toast whenever a server-action message changes
 * to a non-empty string. Pairs naturally with React 19's
 * `useActionState` — pass the returned `message` straight in. */
export function useErrorToast(message: string | null | undefined) {
  useEffect(() => {
    if (message) toast.error(message);
  }, [message]);
}
