"use client";
import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import DMConversationItem from "./_component/DMConversationItem";
import CreateGroupDialog from "./_component/CreateGroupDialog";
import GroupConversationItem from "./_component/GroupConversation";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  // Log dữ liệu nhận được
  return (
    <>
      <ItemList title="Conversations" action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversation found
            </p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  name={conversation.conversation?.name || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              ) : (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember?.username || ""}
                  imageUrl={conversation.otherMember?.imageUrl || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
