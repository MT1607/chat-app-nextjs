import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { request } from "http";

export const get = query({
  args: {
    id: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found 10");
    }

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", (q) =>
        q.eq("memberId", currentUser._id).eq("conversationId", args.id)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("User not in conversation");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
      .order("desc")
      .collect();

    const messagesWithUser = Promise.all(
      messages.map(async (message) => {
        const messageSender = await ctx.db.get(message.senderId);
        if (!messageSender) {
          throw new ConvexError("Message sender not found");
        }

        return {
          message,
          senderImage: messageSender.imageUrl,
          senderName: messageSender.username,
          isCurrentUser: messageSender._id === currentUser._id,
        };
      })
    );

    return messagesWithUser;
  },
});
