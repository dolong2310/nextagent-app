import { RateLimiterPrisma } from "rate-limiter-flexible";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 2;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1;

export const getUsageTracker = async () => {
  const { has } = await auth();
  const hasProAccess = has({ plan: "pro" });
  const points = hasProAccess ? PRO_POINTS : FREE_POINTS;

  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: points,
    duration: DURATION,
  });

  return usageTracker;
};

export const consumeCredits = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATION_COST);
  return result;
};

export const getUsageStatus = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);
  return result;
};
