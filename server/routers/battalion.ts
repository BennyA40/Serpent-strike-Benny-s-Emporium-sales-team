import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  battalionSquads,
  battalionAgents,
  agentAssignments,
  agentCommissions,
  battalionMetrics,
} from "../../drizzle/schema";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

/**
 * Battalion Router - Serpent Strike Command Center
 * Manages squads, agents, assignments, and commission tracking
 */

export const battalionRouter = router({
  // ========== SQUAD MANAGEMENT ==========

  /**
   * Get all squads with agent counts and revenue
   */
  getAllSquads: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const squads = await db
      .select()
      .from(battalionSquads)
      .where(eq(battalionSquads.status, "active"));

    return squads;
  }),

  /**
   * Get squad details with all agents
   */
  getSquadDetails: protectedProcedure
    .input(z.object({ squadId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const squad = await db
        .select()
        .from(battalionSquads)
        .where(eq(battalionSquads.squadId, input.squadId))
        .limit(1);

      if (!squad.length) {
        throw new Error("Squad not found");
      }

      const agents = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.squadId, squad[0].id));

      return {
        squad: squad[0],
        agents,
      };
    }),

  /**
   * Create a new squad (admin only)
   */
  createSquad: protectedProcedure
    .input(
      z.object({
        squadName: z.string(),
        focus: z.enum(["travel", "freelance", "loans", "operations", "creative"]),
        description: z.string().optional(),
        commanderId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only admins can create squads
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const squadId = `squad-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const result = await db.insert(battalionSquads).values({
        squadId,
        squadName: input.squadName,
        commanderId: input.commanderId,
        focus: input.focus,
        description: input.description,
      });

      return { squadId, success: true };
    }),

  // ========== AGENT MANAGEMENT ==========

  /**
   * Get all agents with their performance metrics
   */
  getAllAgents: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const agents = await db
      .select()
      .from(battalionAgents)
      .where(eq(battalionAgents.status, "active"))
      .orderBy(desc(battalionAgents.totalCommissions));

    return agents;
  }),

  /**
   * Get agent details with assignments and commissions
   */
  getAgentDetails: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const agent = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.agentId, input.agentId))
        .limit(1);

      if (!agent.length) {
        throw new Error("Agent not found");
      }

      const assignments = await db
        .select()
        .from(agentAssignments)
        .where(eq(agentAssignments.agentId, agent[0].id));

      const commissions = await db
        .select()
        .from(agentCommissions)
        .where(eq(agentCommissions.agentId, agent[0].id))
        .orderBy(desc(agentCommissions.createdAt));

      return {
        agent: agent[0],
        assignments,
        commissions,
      };
    }),

  /**
   * Create a new agent (admin only)
   */
  createAgent: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
        squadId: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        specialization: z.enum(["travel", "freelance", "loans", "operations", "creative"]),
        rank: z.enum(["commander", "xo", "sergeant", "specialist", "recruit"]).optional(),
        commissionRate: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const agentId = `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const result = await db.insert(battalionAgents).values({
        agentId,
        userId: input.userId,
        squadId: input.squadId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone || undefined,
        profileImage: undefined,
        specialization: input.specialization,
        totalBookings: 0,
        totalProjects: 0,
        totalDeals: 0,
        totalRevenue: "0",
        totalCommissions: "0",
        commissionRate: (input.commissionRate || 5).toString(),
        performanceScore: 0,
        rank: input.rank || "specialist",
        status: "active",
        joinedAt: new Date(),
      } as any);

      return { agentId, success: true };
    }),

  // ========== ASSIGNMENT MANAGEMENT ==========

  /**
   * Assign an agent to a booking/project/deal
   */
  assignAgentToTransaction: protectedProcedure
    .input(
      z.object({
        agentId: z.number(),
        assignmentType: z.enum(["flight", "carRental", "cruise", "freelanceProject", "loanDeal"]),
        referenceId: z.number(),
        referenceName: z.string(),
        clientName: z.string(),
        transactionAmount: z.string(),
        commissionRate: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const commissionAmount = (
        parseFloat(input.transactionAmount) *
        (parseFloat(input.commissionRate) / 100)
      ).toFixed(2);

      const assignmentId = `assign-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await db.insert(agentAssignments).values({
        assignmentId,
        agentId: input.agentId,
        assignmentType: input.assignmentType,
        referenceId: input.referenceId,
        referenceName: input.referenceName,
        clientName: input.clientName,
        transactionAmount: input.transactionAmount,
        commissionRate: input.commissionRate,
        commissionAmount,
      });

      return { assignmentId, commissionAmount, success: true };
    }),

  /**
   * Get all assignments for an agent
   */
  getAgentAssignments: protectedProcedure
    .input(z.object({ agentId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const assignments = await db
        .select()
        .from(agentAssignments)
        .where(eq(agentAssignments.agentId, input.agentId))
        .orderBy(desc(agentAssignments.createdAt));

      return assignments;
    }),

  // ========== COMMISSION TRACKING ==========

  /**
   * Create a commission record for an agent
   */
  createCommission: protectedProcedure
    .input(
      z.object({
        agentId: z.number(),
        assignmentId: z.number().optional(),
        pillar: z.enum(["travel", "freelance", "loans"]),
        transactionType: z.enum(["flight", "carRental", "cruise", "freelanceProject", "loanDeal"]),
        transactionAmount: z.string(),
        commissionRate: z.string(),
        commissionAmount: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const commissionId = `comm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await db.insert(agentCommissions).values({
        commissionId,
        agentId: input.agentId,
        assignmentId: input.assignmentId,
        pillar: input.pillar,
        transactionType: input.transactionType,
        transactionAmount: input.transactionAmount,
        commissionRate: input.commissionRate,
        commissionAmount: input.commissionAmount,
      });

      // Update agent's total commissions
      const agent = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.id, input.agentId))
        .limit(1);

      if (agent.length) {
        const agentData = agent[0]!;
        const newTotal = (
          parseFloat((agentData.totalCommissions as any).toString()) + parseFloat(input.commissionAmount)
        ).toFixed(2);

        if (db) {
          await db
            .update(battalionAgents)
            .set({ totalCommissions: newTotal as any })
            .where(eq(battalionAgents.id, input.agentId));
        }
      }

      return { commissionId, success: true };
    }),

  /**
   * Get all commissions for an agent
   */
  getAgentCommissions: protectedProcedure
    .input(z.object({ agentId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const commissions = await db
        .select()
        .from(agentCommissions)
        .where(eq(agentCommissions.agentId, input.agentId))
        .orderBy(desc(agentCommissions.createdAt));

      return commissions;
    }),

  /**
   * Get commission summary by pillar
   */
  getCommissionSummaryByPillar: protectedProcedure
    .input(z.object({ agentId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const commissions = await db
        .select()
        .from(agentCommissions)
        .where(eq(agentCommissions.agentId, input.agentId));

      const summary = {
        travel: {
          total: 0,
          count: 0,
          average: 0,
        },
        freelance: {
          total: 0,
          count: 0,
          average: 0,
        },
        loans: {
          total: 0,
          count: 0,
          average: 0,
        },
      };

      commissions.forEach((c: any) => {
        const amount = parseFloat(c.commissionAmount.toString());
        summary[c.pillar as keyof typeof summary].total += amount;
        summary[c.pillar as keyof typeof summary].count += 1;
      });

      Object.keys(summary).forEach((pillar) => {
        if (summary[pillar as keyof typeof summary].count > 0) {
          summary[pillar as keyof typeof summary].average = parseFloat(
            (summary[pillar as keyof typeof summary].total / summary[pillar as keyof typeof summary].count).toFixed(2)
          );
        }
      });

      return summary;
    }),

  // ========== PERFORMANCE METRICS ==========

  /**
   * Get agent leaderboard by total commissions
   */
  getAgentLeaderboard: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        period: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const agents = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.status, "active"))
        .orderBy(desc(battalionAgents.totalCommissions))
        .limit(input.limit);

      return agents.map((agent: any, index: any) => ({
        ...agent,
        rank: index + 1,
      }));
    }),

  /**
   * Get squad performance metrics
   */
  getSquadMetrics: protectedProcedure
    .input(z.object({ squadId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const squad = await db
        .select()
        .from(battalionSquads)
        .where(eq(battalionSquads.id, input.squadId))
        .limit(1);

      if (!squad.length) {
        throw new Error("Squad not found");
      }

      const agents = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.squadId, input.squadId));

      const totalRevenue = agents.reduce(
        (sum: number, agent: any) => sum + parseFloat(agent.totalRevenue.toString()),
        0
      );
      const totalCommissions = agents.reduce(
        (sum: number, agent: any) => sum + parseFloat(agent.totalCommissions.toString()),
        0
      );
      const totalBookings = agents.reduce((sum: number, agent: any) => sum + agent.totalBookings, 0);
      const totalProjects = agents.reduce((sum: number, agent: any) => sum + agent.totalProjects, 0);
      const totalDeals = agents.reduce((sum: number, agent: any) => sum + agent.totalDeals, 0);

      return {
        squad: squad[0],
        agents: agents.length,
        totalRevenue: totalRevenue.toFixed(2),
        totalCommissions: totalCommissions.toFixed(2),
        totalBookings,
        totalProjects,
        totalDeals,
        averageCommissionPerAgent: (totalCommissions / agents.length).toFixed(2),
      };
    }),

  /**
   * Get dashboard overview
   */
  getDashboardOverview: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const squads = await db.select().from(battalionSquads);
    const agents = await db.select().from(battalionAgents);
    const commissions = await db.select().from(agentCommissions);

    const totalRevenue = agents.reduce(
      (sum: number, agent: any) => sum + parseFloat(agent.totalRevenue.toString()),
      0
    );
    const totalCommissions = agents.reduce(
      (sum: number, agent: any) => sum + parseFloat(agent.totalCommissions.toString()),
      0
    );

    return {
      totalSquads: squads.length,
      totalAgents: agents.length,
      totalCommissions: totalCommissions.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      topAgents: agents
        .sort((a: any, b: any) => parseFloat(b.totalCommissions.toString()) - parseFloat(a.totalCommissions.toString()))
        .slice(0, 5),
      recentCommissions: commissions
        .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 10),
    };
  }),
});
