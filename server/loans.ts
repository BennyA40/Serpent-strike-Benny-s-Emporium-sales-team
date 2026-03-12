import { eq, and, desc, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  loanApplications,
  loanOffers,
  loanDeals,
  loanCommissions,
  lenders,
  loanPartners,
  partnerReferrals,
} from "../drizzle/schema";
import { getDb } from "./db";
import { nanoid } from "nanoid";

/**
 * Loan Application Operations
 */
export async function createLoanApplication(data: {
  userId: number;
  loanType: string;
  loanAmount: string;
  businessName?: string;
  businessType?: string;
  monthlyRevenue?: string;
  yearsInBusiness?: number;
  creditScore?: number;
  purpose?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const applicationId = nanoid();
  const qualificationScore = calculateQualificationScore(data);

  await db.insert(loanApplications).values({
    applicationId,
    userId: data.userId,
    loanType: data.loanType as any,
    loanAmount: data.loanAmount,
    businessName: data.businessName,
    businessType: data.businessType,
    monthlyRevenue: data.monthlyRevenue,
    yearsInBusiness: data.yearsInBusiness,
    creditScore: data.creditScore,
    purpose: data.purpose,
    qualificationScore,
    status: qualificationScore >= 70 ? "qualified" : "pending",
  });

  return { applicationId, qualificationScore };
}

export async function getLoanApplication(applicationId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(loanApplications)
    .where(eq(loanApplications.applicationId, applicationId))
    .limit(1);

  return result[0] || null;
}

export async function getUserApplications(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(loanApplications)
    .where(eq(loanApplications.userId, userId))
    .orderBy(desc(loanApplications.createdAt));
}

/**
 * Lender Network Operations
 */
export async function getLenders(filters?: { loanType?: string; minAmount?: number }) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(lenders.isActive, 1)];

  const results = await db
    .select()
    .from(lenders)
    .where(and(...conditions));

  return results;
}

export async function getLender(lenderId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(lenders)
    .where(eq(lenders.id, lenderId))
    .limit(1);

  return result[0] || null;
}

/**
 * Loan Offer Operations
 */
export async function createLoanOffer(data: {
  applicationId: string;
  lenderId: number;
  loanAmount: string;
  interestRate?: string;
  term?: number;
  monthlyPayment?: string;
  fees?: string;
  apr?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const offerId = nanoid();

  await db.insert(loanOffers).values({
    offerId,
    applicationId: data.applicationId,
    lenderId: data.lenderId,
    loanAmount: data.loanAmount,
    interestRate: data.interestRate,
    term: data.term,
    monthlyPayment: data.monthlyPayment,
    fees: data.fees,
    apr: data.apr,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return { offerId };
}

export async function getApplicationOffers(applicationId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(loanOffers)
    .where(eq(loanOffers.applicationId, applicationId))
    .orderBy(desc(loanOffers.createdAt));
}

export async function acceptOffer(offerId: string, borrowerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const offer = await db
    .select()
    .from(loanOffers)
    .where(eq(loanOffers.offerId, offerId))
    .limit(1);

  if (!offer[0]) throw new Error("Offer not found");

  const dealId = nanoid();

  await db.insert(loanDeals).values({
    dealId,
    applicationId: offer[0].applicationId,
    offerId,
    lenderId: offer[0].lenderId,
    borrowerId,
    loanAmount: offer[0].loanAmount,
  });

  // Update application status
  await db
    .update(loanApplications)
    .set({ status: "approved" })
    .where(eq(loanApplications.applicationId, offer[0].applicationId));

  // Create commissions
  await createDealCommissions(dealId, offer[0].loanAmount, offer[0].lenderId);

  return { dealId };
}

/**
 * Deal and Commission Operations
 */
export async function createDealCommissions(
  dealId: string,
  loanAmount: string,
  lenderId: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const amount = parseFloat(loanAmount);

  // Primary loan commission (Benny's cut)
  const primaryCommissionRate = 0.05; // 5%
  const primaryCommission = amount * primaryCommissionRate;

  await db.insert(loanCommissions).values({
    dealId,
    layer: "primary_loan",
    commissionAmount: primaryCommission.toString(),
    commissionRate: "5",
    recipientId: 1, // Benny's ID (placeholder)
    recipientType: "benny",
  });

  // Manus infrastructure fee
  const manusCommissionRate = 0.02; // 2%
  const manusCommission = amount * manusCommissionRate;

  await db.insert(loanCommissions).values({
    dealId,
    layer: "primary_loan",
    commissionAmount: manusCommission.toString(),
    commissionRate: "2",
    recipientId: 0, // Manus system
    recipientType: "manus",
  });
}

export async function getLoanDeal(dealId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(loanDeals)
    .where(eq(loanDeals.dealId, dealId))
    .limit(1);

  return result[0] || null;
}

export async function getDealCommissions(dealId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(loanCommissions)
    .where(eq(loanCommissions.dealId, dealId));
}

/**
 * Partner Operations
 */
export async function createPartner(data: {
  userId: number;
  partnerType: string;
  businessName?: string;
  commissionRate: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const partnerId = nanoid();

  await db.insert(loanPartners).values({
    partnerId,
    userId: data.userId,
    partnerType: data.partnerType as any,
    businessName: data.businessName,
    commissionRate: data.commissionRate,
  });

  return { partnerId };
}

export async function getPartnerProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(loanPartners)
    .where(eq(loanPartners.userId, userId))
    .limit(1);

  return result[0] || null;
}

export async function createPartnerReferral(data: {
  partnerId: string;
  applicationId: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const referralId = nanoid();

  await db.insert(partnerReferrals).values({
    referralId,
    partnerId: data.partnerId,
    applicationId: data.applicationId,
  });

  return { referralId };
}

export async function getPartnerReferrals(partnerId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(partnerReferrals)
    .where(eq(partnerReferrals.partnerId, partnerId))
    .orderBy(desc(partnerReferrals.createdAt));
}

/**
 * Helper Functions
 */
function calculateQualificationScore(data: {
  creditScore?: number;
  monthlyRevenue?: string;
  yearsInBusiness?: number;
  loanAmount: string;
}): number {
  let score = 50; // Base score

  // Credit score (max 25 points)
  if (data.creditScore) {
    if (data.creditScore >= 750) score += 25;
    else if (data.creditScore >= 700) score += 20;
    else if (data.creditScore >= 650) score += 15;
    else if (data.creditScore >= 600) score += 10;
    else score += 5;
  }

  // Monthly revenue (max 25 points)
  if (data.monthlyRevenue) {
    const revenue = parseFloat(data.monthlyRevenue);
    const loanAmount = parseFloat(data.loanAmount);
    const ratio = revenue / loanAmount;

    if (ratio >= 0.5) score += 25;
    else if (ratio >= 0.3) score += 20;
    else if (ratio >= 0.2) score += 15;
    else if (ratio >= 0.1) score += 10;
    else score += 5;
  }

  // Years in business (max 25 points)
  if (data.yearsInBusiness) {
    if (data.yearsInBusiness >= 5) score += 25;
    else if (data.yearsInBusiness >= 3) score += 20;
    else if (data.yearsInBusiness >= 2) score += 15;
    else if (data.yearsInBusiness >= 1) score += 10;
    else score += 5;
  }

  return Math.min(score, 100);
}
