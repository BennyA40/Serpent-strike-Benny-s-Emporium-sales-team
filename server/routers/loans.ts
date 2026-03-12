import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  createLoanApplication,
  getLoanApplication,
  getUserApplications,
  getLenders,
  getLender,
  createLoanOffer,
  getApplicationOffers,
  acceptOffer,
  getLoanDeal,
  getDealCommissions,
  createPartner,
  getPartnerProfile,
  createPartnerReferral,
  getPartnerReferrals,
} from "../loans";

export const loansRouter = router({
  // Loan Application Operations
  createApplication: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        loanType: z.enum(["mca", "term_loan", "loc", "equipment", "personal", "business"]),
        loanAmount: z.string(),
        businessName: z.string().optional(),
        businessType: z.string().optional(),
        monthlyRevenue: z.string().optional(),
        yearsInBusiness: z.number().optional(),
        creditScore: z.number().optional(),
        purpose: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await createLoanApplication(input);
      return result;
    }),

  getApplication: publicProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ input }) => {
      return await getLoanApplication(input.applicationId);
    }),

  getMyApplications: protectedProcedure.query(async ({ ctx }) => {
    return await getUserApplications(ctx.user.id);
  }),

  // Lender Network Operations
  getLenders: publicProcedure.query(async () => {
    return await getLenders();
  }),

  getLender: publicProcedure
    .input(z.object({ lenderId: z.number() }))
    .query(async ({ input }) => {
      return await getLender(input.lenderId);
    }),

  // Loan Offer Operations
  createOffer: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        lenderId: z.number(),
        loanAmount: z.string(),
        interestRate: z.string().optional(),
        term: z.number().optional(),
        monthlyPayment: z.string().optional(),
        fees: z.string().optional(),
        apr: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await createLoanOffer(input);
      return result;
    }),

  getOffers: publicProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ input }) => {
      return await getApplicationOffers(input.applicationId);
    }),

  acceptOffer: protectedProcedure
    .input(z.object({ offerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await acceptOffer(input.offerId, ctx.user.id);
      return result;
    }),

  // Deal Operations
  getDeal: publicProcedure
    .input(z.object({ dealId: z.string() }))
    .query(async ({ input }) => {
      return await getLoanDeal(input.dealId);
    }),

  getDealCommissions: publicProcedure
    .input(z.object({ dealId: z.string() }))
    .query(async ({ input }) => {
      return await getDealCommissions(input.dealId);
    }),

  // Partner Operations
  createPartnerProfile: protectedProcedure
    .input(
      z.object({
        partnerType: z.enum(["agent", "freelancer", "travel_partner", "affiliate"]),
        businessName: z.string().optional(),
        commissionRate: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createPartner({
        userId: ctx.user.id,
        ...input,
      });
      return result;
    }),

  getPartnerProfile: protectedProcedure.query(async ({ ctx }) => {
    return await getPartnerProfile(ctx.user.id);
  }),

  createReferral: protectedProcedure
    .input(
      z.object({
        partnerId: z.string(),
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await createPartnerReferral(input);
      return result;
    }),

  getMyReferrals: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerProfile(ctx.user.id);
    if (!partner) return [];
    return await getPartnerReferrals(partner.partnerId);
  }),
});
