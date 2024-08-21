import { ConvexError } from "convex/values";
import { MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
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
      throw new ConvexError("User not found 8");
    }

    const friendships1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();
    const friendships2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    const friendship = [...friendships1, ...friendships2];

    const friends = await Promise.all(
      friendship.map(async (friendship) => {
        const friend = await ctx.db.get(
          currentUser._id === friendship.user1
            ? friendship.user2
            : friendship.user1
        );

        if (!friend) {
          throw new ConvexError("Friend not found");
        }

        return friend;
      })
    );
    return friends;
  },
});
