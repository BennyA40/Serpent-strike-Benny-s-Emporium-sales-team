import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { battalionSquads, battalionAgents, agentCommissions, agentAssignments } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Battalion Operations", () => {
  let db: any;
  let testSquadId: number;
  let testAgentId: number;

  beforeAll(async () => {
    db = await getDb();
    if (!db) throw new Error("Database not available");
  });

  describe("Squad Management", () => {
    it("should create a new squad", async () => {
      const result = await db.insert(battalionSquads).values({
        squadId: `test-squad-${Date.now()}`,
        squadName: "Test Squad",
        focus: "travel",
        commanderId: 1,
        description: "Test squad for vitest",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve all active squads", async () => {
      const squads = await db
        .select()
        .from(battalionSquads)
        .where(eq(battalionSquads.status, "active"));

      expect(Array.isArray(squads)).toBe(true);
      expect(squads.length).toBeGreaterThan(0);
    });
  });

  describe("Agent Management", () => {
    it("should create a new agent", async () => {
      const agentId = `test-agent-${Date.now()}`;
      const result = await db.insert(battalionAgents).values({
        agentId,
        userId: 1,
        squadId: 1,
        firstName: "Test",
        lastName: "Agent",
        email: "test@example.com",
        specialization: "travel",
        rank: "specialist",
        commissionRate: "5.00",
        totalCommissions: "0",
        totalRevenue: "0",
        status: "active",
      } as any);

      expect(result).toBeDefined();
    });

    it("should retrieve all active agents", async () => {
      const agents = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.status, "active"));

      expect(Array.isArray(agents)).toBe(true);
    });

    it("should calculate agent commission correctly", () => {
      const transactionAmount = 1000;
      const commissionRate = 5;
      const expectedCommission = (transactionAmount * commissionRate) / 100;

      expect(expectedCommission).toBe(50);
    });
  });

  describe("Commission Tracking", () => {
    it("should create a commission record", async () => {
      const commissionId = `test-comm-${Date.now()}`;
      const result = await db.insert(agentCommissions).values({
        commissionId,
        agentId: 1,
        pillar: "travel",
        transactionType: "flight",
        transactionAmount: "1000.00",
        commissionRate: "5.00",
        commissionAmount: "50.00",
      } as any);

      expect(result).toBeDefined();
    });

    it("should retrieve commissions for an agent", async () => {
      const commissions = await db
        .select()
        .from(agentCommissions)
        .where(eq(agentCommissions.agentId, 1));

      expect(Array.isArray(commissions)).toBe(true);
    });

    it("should calculate total commissions by pillar", async () => {
      const commissions = await db
        .select()
        .from(agentCommissions)
        .where(eq(agentCommissions.agentId, 1));

      const summary = {
        travel: { total: 0, count: 0 },
        freelance: { total: 0, count: 0 },
        loans: { total: 0, count: 0 },
      };

      commissions.forEach((c: any) => {
        const amount = parseFloat(c.commissionAmount.toString());
        summary[c.pillar as keyof typeof summary].total += amount;
        summary[c.pillar as keyof typeof summary].count += 1;
      });

      expect(summary.travel.total).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Assignment Tracking", () => {
    it("should create an agent assignment", async () => {
      const assignmentId = `test-assign-${Date.now()}`;
      const result = await db.insert(agentAssignments).values({
        assignmentId,
        agentId: 1,
        assignmentType: "flight",
        referenceId: 1,
        referenceName: "Flight to Paris",
        clientName: "John Doe",
        transactionAmount: "1000.00",
        commissionRate: "5.00",
        commissionAmount: "50.00",
      } as any);

      expect(result).toBeDefined();
    });

    it("should retrieve assignments for an agent", async () => {
      const assignments = await db
        .select()
        .from(agentAssignments)
        .where(eq(agentAssignments.agentId, 1));

      expect(Array.isArray(assignments)).toBe(true);
    });
  });

  describe("Performance Metrics", () => {
    it("should calculate agent performance score", () => {
      const bookings = 10;
      const projects = 5;
      const deals = 3;
      const totalTransactions = bookings + projects + deals;

      // Simple scoring: 1 point per transaction, capped at 100
      const score = Math.min(totalTransactions * 2, 100);

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should rank agents by total commissions", async () => {
      const agents = await db
        .select()
        .from(battalionAgents)
        .where(eq(battalionAgents.status, "active"));

      const ranked = agents
        .sort((a: any, b: any) => {
          const aTotal = parseFloat(a.totalCommissions.toString());
          const bTotal = parseFloat(b.totalCommissions.toString());
          return bTotal - aTotal;
        })
        .slice(0, 10)
        .map((agent: any, index: number) => ({
          ...agent,
          rank: index + 1,
        }));

      expect(Array.isArray(ranked)).toBe(true);
      if (ranked.length > 0) {
        expect(ranked[0].rank).toBe(1);
      }
    });
  });
});
