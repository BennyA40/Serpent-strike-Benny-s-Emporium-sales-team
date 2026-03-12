import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getFreelancerProfile,
  createFreelancerProfile,
  updateFreelancerProfile,
  getFreelanceServices,
  getFreelancerServices,
  createFreelanceService,
  createFreelanceProject,
  getFreelanceProject,
  getClientProjects,
  getFreelancerProjects,
  updateProjectStatus,
  sendMessage,
  getProjectMessages,
  createReview,
  getFreelancerReviews,
  createPayout,
  getFreelancerPayouts,
} from "../freelance";
import { nanoid } from "nanoid";

export const freelanceRouter = router({
  // Freelancer Profile Operations
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await getFreelancerProfile(ctx.user.id);
  }),

  createProfile: protectedProcedure
    .input(
      z.object({
        title: z.string().min(10),
        bio: z.string().optional(),
        profileImage: z.string().optional(),
        hourlyRate: z.number().positive(),
        skills: z.array(z.string()),
        categories: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createFreelancerProfile({
        userId: ctx.user.id,
        title: input.title,
        bio: input.bio,
        profileImage: input.profileImage,
        hourlyRate: input.hourlyRate.toString(),
        skills: input.skills,
        categories: input.categories,
      });
      return { success: true };
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        bio: z.string().optional(),
        profileImage: z.string().optional(),
        hourlyRate: z.number().optional(),
        skills: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        availability: z.enum(["available", "busy", "unavailable"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updates: any = { ...input };
      if (input.hourlyRate !== undefined) {
        updates.hourlyRate = input.hourlyRate.toString();
      }
      await updateFreelancerProfile(ctx.user.id, updates);
      return { success: true };
    }),

  // Freelance Services Operations
  listServices: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      return await getFreelanceServices(input);
    }),

  getMyServices: protectedProcedure.query(async ({ ctx }) => {
    return await getFreelancerServices(ctx.user.id);
  }),

  createService: protectedProcedure
    .input(
      z.object({
        title: z.string().min(20),
        description: z.string().min(50),
        category: z.string(),
        price: z.number().positive(),
        deliveryDays: z.number().positive(),
        serviceImage: z.string().optional(),
        highlights: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createFreelanceService({
        freelancerId: ctx.user.id,
        title: input.title,
        description: input.description,
        category: input.category,
        price: input.price.toString(),
        deliveryDays: input.deliveryDays,
        serviceImage: input.serviceImage,
        highlights: input.highlights,
      });
      return { success: true };
    }),

  // Freelance Projects Operations
  hireFreelancer: protectedProcedure
    .input(
      z.object({
        freelancerId: z.number(),
        serviceId: z.number().optional(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
        projectPrice: z.number().positive(),
        deliveryDeadline: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const projectId = nanoid();
      await createFreelanceProject({
        projectId,
        clientId: ctx.user.id,
        freelancerId: input.freelancerId,
        serviceId: input.serviceId,
        title: input.title,
        description: input.description,
        category: input.category,
        projectPrice: input.projectPrice.toString(),
        deliveryDeadline: input.deliveryDeadline,
        platformFee: "0",
        freelancerPayout: "0",
        manusFeature: "0",
        bennysProfit: "0",
      });
      return { projectId, success: true };
    }),

  getProject: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      return await getFreelanceProject(input.projectId);
    }),

  getMyProjects: protectedProcedure.query(async ({ ctx }) => {
    return await getClientProjects(ctx.user.id);
  }),

  getAssignedProjects: protectedProcedure.query(async ({ ctx }) => {
    return await getFreelancerProjects(ctx.user.id);
  }),

  updateProjectStatus: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        status: z.enum(["pending", "active", "completed", "cancelled", "disputed"]),
        paymentStatus: z.enum(["pending", "paid", "refunded"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await updateProjectStatus(input.projectId, input.status, input.paymentStatus);
      return { success: true };
    }),

  // Messaging Operations
  sendMessage: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        recipientId: z.number(),
        message: z.string().min(1),
        attachments: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await sendMessage({
        projectId: input.projectId,
        senderId: ctx.user.id,
        recipientId: input.recipientId,
        message: input.message,
        attachments: input.attachments,
      });
      return { success: true };
    }),

  getMessages: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      return await getProjectMessages(input.projectId);
    }),

  // Review Operations
  submitReview: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        freelancerId: z.number(),
        rating: z.number().min(1).max(5),
        review: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createReview({
        projectId: input.projectId,
        clientId: ctx.user.id,
        freelancerId: input.freelancerId,
        rating: input.rating,
        review: input.review,
      });
      return { success: true };
    }),

  getReviews: publicProcedure
    .input(z.object({ freelancerId: z.number() }))
    .query(async ({ input }) => {
      return await getFreelancerReviews(input.freelancerId);
    }),

  // Payout Operations
  getPayouts: protectedProcedure.query(async ({ ctx }) => {
    return await getFreelancerPayouts(ctx.user.id);
  }),

  requestPayout: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        paymentMethod: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createPayout({
        freelancerId: ctx.user.id,
        payoutAmount: input.amount.toString(),
        paymentMethod: input.paymentMethod,
        payoutStatus: "pending",
      });
      return { success: true };
    }),
});
