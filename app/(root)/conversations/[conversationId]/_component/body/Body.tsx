"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { userConversations } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React from "react";
import Message from "./Message";
type Props = {
  members: {
    lastSeenMessageId?: Id<"messages">;
    username?: string;
    [key: string]: any;
  }[];
};

const Body = ({ members }: Props) => {
  const { conversationId } = userConversations();
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });
  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser =
            messages[index - 1]?.message.senderId ===
            messages[index].message.senderId;
          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              senderImage={senderImage}
              senderName={senderName}
              lastByUser={lastByUser}
              content={message.content}
              createdAt={message._creationTime}
              // seen={seenMessage}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
