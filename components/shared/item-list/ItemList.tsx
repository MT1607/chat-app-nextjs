"use client";
import { Card } from "@/components/ui/card";
import { userConversations } from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isActive } = userConversations();

  console.log("IS ACTIVE", isActive);
  return (
    <Card
      className={cn("hidden h-full w-full lg:flex-none lg:w-80 lg:ml-4 p-2", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2x1 font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
