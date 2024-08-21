"use client";
import LoadingLogo from "@/components/shared/LoadingLogo";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const CLERK_PUBLISHER_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

const convex = new ConvexReactClient(CONVEX_URL);
console.log("Convex URL:", CLERK_PUBLISHER_KEY);

const ConvexClientProvider = ({ children }: Props) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHER_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
