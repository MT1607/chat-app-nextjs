import { useParams } from "next/navigation";
import { useMemo } from "react";

export const userConversations = () => {
  const params = useParams();
  const conversationId = useMemo(
    () => params?.conversationId || ("" as string),
    [params?.conversationId]
  );

  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return {
    conversationId,
    isActive,
  };
};
