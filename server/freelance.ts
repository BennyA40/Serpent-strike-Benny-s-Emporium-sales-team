import { eq, and, desc } from "drizzle-orm";
import { getDb } from "./db";
import {
  freelancerProfiles,
  freelanceServices,
  freelanceProjects,
  freelanceMessages,
  freelanceReviews,
  freelancePayouts,
  InsertFreelancerProfile,
  InsertFreelanceService,
  InsertFreelanceProject,
  InsertFreelanceMessage,
  InsertFreelanceReview,
} from "../drizzle/schema";

/**
 * Freelancer Profile Operations
 */
export async function getFreelancerProfile(freelancerId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(freelancerProfiles)
    .where(eq(freelancerProfiles.userId, freelancerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createFreelancerProfile(profile: InsertFreelancerProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(freelancerProfiles).values(profile);
}

export async function updateFreelancerProfile(
  freelancerId: number,
  updates: Partial<InsertFreelancerProfile>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(freelancerProfiles)
    .set(updates)
    .where(eq(freelancerProfiles.userId, freelancerId));
}

/**
 * Freelance Services Operations
 */
export async function getFreelanceServices(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(freelanceServices.isActive, 1)];

  if (filters?.category) {
    conditions.push(eq(freelanceServices.category, filters.category));
  }

  const results = await db
    .select()
    .from(freelanceServices)
    .where(and(...conditions))
    .orderBy(desc(freelanceServices.totalOrders))
    .limit(filters?.limit || 20);

  return results;
}

export async function getFreelancerServices(freelancerId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelanceServices)
    .where(eq(freelanceServices.freelancerId, freelancerId))
    .orderBy(desc(freelanceServices.totalOrders));

  return results;
}

export async function createFreelanceService(service: InsertFreelanceService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(freelanceServices).values(service);
}

/**
 * Freelance Projects Operations
 */
export async function createFreelanceProject(project: InsertFreelanceProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Calculate commission splits (30% platform fee)
  const platformFee = Number(project.projectPrice) * 0.3;
  const manusFeature = Number(project.projectPrice) * 0.15;
  const bennysProfit = Number(project.projectPrice) * 0.15;
  const freelancerPayout = Number(project.projectPrice) * 0.7;

  const projectData = {
    ...project,
    platformFee: platformFee.toString(),
    manusFeature: manusFeature.toString(),
    bennysProfit: bennysProfit.toString(),
    freelancerPayout: freelancerPayout.toString(),
  };

  await db.insert(freelanceProjects).values(projectData);
}

export async function getFreelanceProject(projectId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(freelanceProjects)
    .where(eq(freelanceProjects.projectId, projectId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getClientProjects(clientId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelanceProjects)
    .where(eq(freelanceProjects.clientId, clientId))
    .orderBy(desc(freelanceProjects.createdAt));

  return results;
}

export async function getFreelancerProjects(freelancerId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelanceProjects)
    .where(eq(freelanceProjects.freelancerId, freelancerId))
    .orderBy(desc(freelanceProjects.createdAt));

  return results;
}

export async function updateProjectStatus(
  projectId: string,
  status: string,
  paymentStatus?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updates: any = { status };
  if (paymentStatus) updates.paymentStatus = paymentStatus;

  await db
    .update(freelanceProjects)
    .set(updates)
    .where(eq(freelanceProjects.projectId, projectId));
}

/**
 * Freelance Messages Operations
 */
export async function sendMessage(message: InsertFreelanceMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(freelanceMessages).values(message);
}

export async function getProjectMessages(projectId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelanceMessages)
    .where(eq(freelanceMessages.projectId, projectId))
    .orderBy(desc(freelanceMessages.createdAt));

  return results;
}

/**
 * Freelance Reviews Operations
 */
export async function createReview(review: InsertFreelanceReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(freelanceReviews).values(review);
}

export async function getFreelancerReviews(freelancerId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelanceReviews)
    .where(eq(freelanceReviews.freelancerId, freelancerId))
    .orderBy(desc(freelanceReviews.createdAt));

  return results;
}

/**
 * Freelance Payouts Operations
 */
export async function createPayout(payout: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(freelancePayouts).values(payout);
}

export async function getFreelancerPayouts(freelancerId: number) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select()
    .from(freelancePayouts)
    .where(eq(freelancePayouts.freelancerId, freelancerId))
    .orderBy(desc(freelancePayouts.createdAt));

  return results;
}
