"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userConversations } from "@/hooks/useConversation";
import { ModeToggle } from "@/components/ui/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";

const MobileNav = () => {
  const paths = useNavigation();
  const { isActive } = userConversations();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center gap-4">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                      {path.count ? (
                        <Badge className="absolute left-6 bottom-7 px-2">
                          {path.count}
                        </Badge>
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <ModeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
