"use client";

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    // Ensure the URL is absolute
    const absoluteUrl = `${window.location.origin}/conversations`;
    router.push(absoluteUrl);
  }, [error, router]);

  return <ConversationFallback />;
}
