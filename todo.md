# Benny's Emporium — Battalion Integration TODO

## Phase 1: Planning & Architecture
- [ ] Design battalion data schema with squad/agent relationships
- [ ] Map commission flow across Travel, Freelance, Loans pillars
- [ ] Plan role-based access control (Shelby, Merle, agents, admins)
- [ ] Define real-time metrics and KPIs

## Phase 2: Database Schema
- [ ] Extend schema with battalion tables (squads, agents, assignments)
- [ ] Add commission tracking tables
- [ ] Create relationships between agents and bookings/projects/loans
- [ ] Run pnpm db:push to migrate

## Phase 3: Backend tRPC Procedures
- [ ] Build procedures for squad management
- [ ] Build procedures for agent performance tracking
- [ ] Build procedures for real-time commission calculations
- [ ] Build procedures for payout management

## Phase 4: Admin Dashboard
- [ ] Create battalion command center page
- [ ] Implement role-based access (Shelby/Merle only)
- [ ] Build squad overview and agent roster
- [ ] Add real-time performance metrics

## Phase 5: Agent Performance & Leaderboards
- [ ] Build agent leaderboard by pillar
- [ ] Create individual agent dashboards
- [ ] Implement performance trending
- [ ] Add achievement badges

## Phase 6: Commission System
- [ ] Implement real-time commission calculations
- [ ] Build payout scheduling
- [ ] Create commission audit logs
- [ ] Add commission dispute resolution

## Phase 7: Pillar Integration
- [ ] Link Travel bookings to agent commissions
- [ ] Link Freelance projects to agent commissions
- [ ] Link Loan applications to agent commissions
- [ ] Display squad metrics on each pillar page

## Phase 8: Testing
- [ ] Write vitest tests for commission logic
- [ ] Test role-based access control
- [ ] Test real-time metric updates
- [ ] Test payout calculations

## Phase 9: Delivery
- [ ] Save checkpoint
- [ ] Document integration
- [ ] Verify all systems operational
