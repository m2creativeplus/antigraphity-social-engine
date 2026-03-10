import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  campaigns: defineTable({
    topic: v.string(),
    tone: v.optional(v.string()),
    platforms: v.array(v.string()),
    status: v.string(), // e.g., "generating", "completed", "failed"
    createdAt: v.number(),
  }),
  posts: defineTable({
    campaignId: v.id("campaigns"),
    platform: v.string(), // "LinkedIn", "X", "Instagram", "Facebook", "TikTok"
    content: v.string(),
    images: v.optional(v.array(v.string())),
    video: v.optional(v.string()), // URL to video
    audio: v.optional(v.string()), // URL to audio
    createdAt: v.number(),
  }).index("by_campaignId", ["campaignId"]),
});
