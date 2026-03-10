import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCampaign = mutation({
  args: {
    topic: v.string(),
    tone: v.optional(v.string()),
    platforms: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const campaignId = await ctx.db.insert("campaigns", {
      topic: args.topic,
      tone: args.tone,
      platforms: args.platforms,
      status: "generating",
      createdAt: Date.now(),
    });
    return campaignId;
  },
});

export const updateCampaignStatus = mutation({
  args: {
    campaignId: v.id("campaigns"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.campaignId, { status: args.status });
  },
});

export const savePost = mutation({
  args: {
    campaignId: v.id("campaigns"),
    platform: v.string(),
    content: v.string(),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      campaignId: args.campaignId,
      platform: args.platform,
      content: args.content,
      images: args.images,
      createdAt: Date.now(),
    });
  },
});

export const getCampaigns = query({
  handler: async (ctx) => {
    return await ctx.db.query("campaigns").order("desc").take(50);
  },
});

export const getPostsByCampaign = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_campaignId", (q) => q.eq("campaignId", args.campaignId))
      .collect();
  },
});
