import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Flight Bookings Table
 * Stores flight search results and booking information
 */
export const flightBookings = mysqlTable("flight_bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bookingReference: varchar("bookingReference", { length: 64 }).notNull().unique(),
  departureCity: varchar("departureCity", { length: 100 }).notNull(),
  arrivalCity: varchar("arrivalCity", { length: 100 }).notNull(),
  departureDate: timestamp("departureDate").notNull(),
  returnDate: timestamp("returnDate"),
  passengers: int("passengers").notNull().default(1),
  airline: varchar("airline", { length: 100 }),
  flightNumber: varchar("flightNumber", { length: 20 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending"),
  sabreData: json("sabreData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FlightBooking = typeof flightBookings.$inferSelect;
export type InsertFlightBooking = typeof flightBookings.$inferInsert;

/**
 * Car Rental Bookings Table
 */
export const carRentalBookings = mysqlTable("car_rental_bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bookingReference: varchar("bookingReference", { length: 64 }).notNull().unique(),
  pickupLocation: varchar("pickupLocation", { length: 200 }).notNull(),
  dropoffLocation: varchar("dropoffLocation", { length: 200 }).notNull(),
  pickupDate: timestamp("pickupDate").notNull(),
  dropoffDate: timestamp("dropoffDate").notNull(),
  carType: varchar("carType", { length: 100 }),
  rentalCompany: varchar("rentalCompany", { length: 100 }),
  dailyRate: decimal("dailyRate", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending"),
  rentalData: json("rentalData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CarRentalBooking = typeof carRentalBookings.$inferSelect;
export type InsertCarRentalBooking = typeof carRentalBookings.$inferInsert;

/**
 * Cruise Bookings Table
 */
export const cruiseBookings = mysqlTable("cruise_bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bookingReference: varchar("bookingReference", { length: 64 }).notNull().unique(),
  cruiseLine: varchar("cruiseLine", { length: 100 }).notNull(),
  ship: varchar("ship", { length: 100 }),
  departurePort: varchar("departurePort", { length: 100 }).notNull(),
  destinationPorts: text("destinationPorts"),
  departureDate: timestamp("departureDate").notNull(),
  returnDate: timestamp("returnDate").notNull(),
  cabinType: varchar("cabinType", { length: 100 }),
  passengers: int("passengers").notNull().default(1),
  pricePerPerson: decimal("pricePerPerson", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending"),
  cruiseData: json("cruiseData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CruiseBooking = typeof cruiseBookings.$inferSelect;
export type InsertCruiseBooking = typeof cruiseBookings.$inferInsert;

/**
 * Commission Tracking Table
 */
export const commissions = mysqlTable("commissions", {
  id: int("id").autoincrement().primaryKey(),
  bookingType: mysqlEnum("bookingType", ["flight", "carRental", "cruise"]).notNull(),
  bookingId: int("bookingId").notNull(),
  userId: int("userId").notNull(),
  bookingAmount: decimal("bookingAmount", { precision: 10, scale: 2 }).notNull(),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  commissionAmount: decimal("commissionAmount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: mysqlEnum("status", ["pending", "earned", "paid"]).default("pending"),
  paymentDate: timestamp("paymentDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Commission = typeof commissions.$inferSelect;
export type InsertCommission = typeof commissions.$inferInsert;

/**
 * Booking Quotes Table
 */
export const bookingQuotes = mysqlTable("booking_quotes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  bookingType: mysqlEnum("bookingType", ["flight", "carRental", "cruise", "custom"]).notNull(),
  details: json("details"),
  status: mysqlEnum("status", ["pending", "quoted", "booked", "expired"]).default("pending"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BookingQuote = typeof bookingQuotes.$inferSelect;
export type InsertBookingQuote = typeof bookingQuotes.$inferInsert;
/**
 * Freelancer Profiles Table
 * Stores freelancer information, skills, and rates
 */
export const freelancerProfiles = mysqlTable("freelancer_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  bio: text("bio"),
  profileImage: varchar("profileImage", { length: 500 }),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }).notNull(),
  skills: json("skills"), // Array of skill strings
  categories: json("categories"), // Array of category strings
  portfolio: json("portfolio"), // Array of portfolio items
  totalEarnings: decimal("totalEarnings", { precision: 12, scale: 2 }).default("0"),
  totalProjects: int("totalProjects").default(0),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("5"),
  totalReviews: int("totalReviews").default(0),
  isVerified: int("isVerified").default(0),
  availability: mysqlEnum("availability", ["available", "busy", "unavailable"]).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FreelancerProfile = typeof freelancerProfiles.$inferSelect;
export type InsertFreelancerProfile = typeof freelancerProfiles.$inferInsert;

/**
 * Freelance Services Table
 * Individual service listings created by freelancers
 */
export const freelanceServices = mysqlTable("freelance_services", {
  id: int("id").autoincrement().primaryKey(),
  freelancerId: int("freelancerId").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  deliveryDays: int("deliveryDays").notNull(),
  serviceImage: varchar("serviceImage", { length: 500 }),
  highlights: json("highlights"), // Array of key highlights
  totalOrders: int("totalOrders").default(0),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("5"),
  totalReviews: int("totalReviews").default(0),
  isActive: int("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FreelanceService = typeof freelanceServices.$inferSelect;
export type InsertFreelanceService = typeof freelanceServices.$inferInsert;

/**
 * Freelance Projects/Gigs Table
 * Bookings/projects created when clients hire freelancers
 */
export const freelanceProjects = mysqlTable("freelance_projects", {
  id: int("id").autoincrement().primaryKey(),
  projectId: varchar("projectId", { length: 64 }).notNull().unique(),
  clientId: int("clientId").notNull(),
  freelancerId: int("freelancerId").notNull(),
  serviceId: int("serviceId"),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  projectPrice: decimal("projectPrice", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platformFee", { precision: 10, scale: 2 }).notNull(), // 30% of price
  freelancerPayout: decimal("freelancerPayout", { precision: 10, scale: 2 }).notNull(), // 70% of price
  manusFeature: decimal("manusFeature", { precision: 10, scale: 2 }).notNull(), // 15% of price
  bennysProfit: decimal("bennysProfit", { precision: 10, scale: 2 }).notNull(), // 15% of price
  deliveryDeadline: timestamp("deliveryDeadline").notNull(),
  status: mysqlEnum("status", ["pending", "active", "completed", "cancelled", "disputed"]).default("pending"),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "refunded"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FreelanceProject = typeof freelanceProjects.$inferSelect;
export type InsertFreelanceProject = typeof freelanceProjects.$inferInsert;

/**
 * Freelance Messages Table
 * Communication between clients and freelancers
 */
export const freelanceMessages = mysqlTable("freelance_messages", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  message: text("message").notNull(),
  attachments: json("attachments"), // Array of file URLs
  isRead: int("isRead").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FreelanceMessage = typeof freelanceMessages.$inferSelect;
export type InsertFreelanceMessage = typeof freelanceMessages.$inferInsert;

/**
 * Freelance Reviews Table
 * Client reviews for completed projects
 */
export const freelanceReviews = mysqlTable("freelance_reviews", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  clientId: int("clientId").notNull(),
  freelancerId: int("freelancerId").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  review: text("review"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FreelanceReview = typeof freelanceReviews.$inferSelect;
export type InsertFreelanceReview = typeof freelanceReviews.$inferInsert;

/**
 * Freelance Payouts Table
 * Track payments to freelancers
 */
export const freelancePayouts = mysqlTable("freelance_payouts", {
  id: int("id").autoincrement().primaryKey(),
  freelancerId: int("freelancerId").notNull(),
  projectId: int("projectId"),
  payoutAmount: decimal("payoutAmount", { precision: 10, scale: 2 }).notNull(),
  payoutStatus: mysqlEnum("payoutStatus", ["pending", "processing", "completed", "failed"]).default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  stripePayoutId: varchar("stripePayoutId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type FreelancePayout = typeof freelancePayouts.$inferSelect;
export type InsertFreelancePayout = typeof freelancePayouts.$inferInsert;


/**
 * Loan Brokering Hub Tables
 */

/**
 * Loan Applications - Main intake form
 */
export const loanApplications = mysqlTable("loan_applications", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: varchar("applicationId", { length: 64 }).notNull().unique(),
  userId: int("userId").notNull(),
  loanType: mysqlEnum("loanType", ["mca", "term_loan", "loc", "equipment", "personal", "business"]).notNull(),
  loanAmount: decimal("loanAmount", { precision: 15, scale: 2 }).notNull(),
  businessName: varchar("businessName", { length: 255 }),
  businessType: varchar("businessType", { length: 100 }),
  monthlyRevenue: decimal("monthlyRevenue", { precision: 15, scale: 2 }),
  yearsInBusiness: int("yearsInBusiness"),
  creditScore: int("creditScore"),
  purpose: text("purpose"),
  status: mysqlEnum("status", ["pending", "qualified", "routed", "approved", "declined", "funded"]).default("pending"),
  qualificationScore: int("qualificationScore"),
  routedLenderId: int("routedLenderId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertLoanApplication = typeof loanApplications.$inferInsert;

/**
 * Lender Network - Available lenders and their products
 */
export const lenders = mysqlTable("lenders", {
  id: int("id").autoincrement().primaryKey(),
  lenderName: varchar("lenderName", { length: 255 }).notNull(),
  lenderType: mysqlEnum("lenderType", ["mca", "bank", "alternative", "credit_repair", "affiliate"]).notNull(),
  apiKey: varchar("apiKey", { length: 255 }),
  apiEndpoint: varchar("apiEndpoint", { length: 255 }),
  minLoanAmount: decimal("minLoanAmount", { precision: 15, scale: 2 }),
  maxLoanAmount: decimal("maxLoanAmount", { precision: 15, scale: 2 }),
  minCreditScore: int("minCreditScore"),
  minMonthlyRevenue: decimal("minMonthlyRevenue", { precision: 15, scale: 2 }),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  isActive: int("isActive").default(1),
  contactEmail: varchar("contactEmail", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lender = typeof lenders.$inferSelect;
export type InsertLender = typeof lenders.$inferInsert;

/**
 * Loan Offers - Offers from lenders to borrowers
 */
export const loanOffers = mysqlTable("loan_offers", {
  id: int("id").autoincrement().primaryKey(),
  offerId: varchar("offerId", { length: 64 }).notNull().unique(),
  applicationId: varchar("applicationId", { length: 64 }).notNull(),
  lenderId: int("lenderId").notNull(),
  loanAmount: decimal("loanAmount", { precision: 15, scale: 2 }).notNull(),
  interestRate: decimal("interestRate", { precision: 5, scale: 2 }),
  term: int("term"),
  monthlyPayment: decimal("monthlyPayment", { precision: 15, scale: 2 }),
  fees: decimal("fees", { precision: 15, scale: 2 }),
  apr: decimal("apr", { precision: 5, scale: 2 }),
  status: mysqlEnum("status", ["pending", "accepted", "rejected", "expired"]).default("pending"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanOffer = typeof loanOffers.$inferSelect;
export type InsertLoanOffer = typeof loanOffers.$inferInsert;

/**
 * Loan Deals - Completed transactions
 */
export const loanDeals = mysqlTable("loan_deals", {
  id: int("id").autoincrement().primaryKey(),
  dealId: varchar("dealId", { length: 64 }).notNull().unique(),
  applicationId: varchar("applicationId", { length: 64 }).notNull(),
  offerId: varchar("offerId", { length: 64 }).notNull(),
  lenderId: int("lenderId").notNull(),
  borrowerId: int("borrowerId").notNull(),
  loanAmount: decimal("loanAmount", { precision: 15, scale: 2 }).notNull(),
  fundingDate: timestamp("fundingDate"),
  status: mysqlEnum("status", ["pending", "funded", "active", "completed", "defaulted"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanDeal = typeof loanDeals.$inferSelect;
export type InsertLoanDeal = typeof loanDeals.$inferInsert;

/**
 * Commission Tracking - Multi-layer commission system
 */
export const loanCommissions = mysqlTable("loan_commissions", {
  id: int("id").autoincrement().primaryKey(),
  dealId: varchar("dealId", { length: 64 }).notNull(),
  layer: mysqlEnum("layer", ["primary_loan", "secondary_offer", "lifestyle_upsell", "referral"]).notNull(),
  commissionAmount: decimal("commissionAmount", { precision: 15, scale: 2 }).notNull(),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  recipientId: int("recipientId").notNull(),
  recipientType: mysqlEnum("recipientType", ["benny", "manus", "partner", "freelancer"]).notNull(),
  status: mysqlEnum("status", ["pending", "earned", "paid"]).default("pending"),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanCommission = typeof loanCommissions.$inferSelect;
export type InsertLoanCommission = typeof loanCommissions.$inferInsert;

/**
 * Partner Network - Referral agents and partners
 */
export const loanPartners = mysqlTable("loan_partners", {
  id: int("id").autoincrement().primaryKey(),
  partnerId: varchar("partnerId", { length: 64 }).notNull().unique(),
  userId: int("userId").notNull(),
  partnerType: mysqlEnum("partnerType", ["agent", "freelancer", "travel_partner", "affiliate"]).notNull(),
  businessName: varchar("businessName", { length: 255 }),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  totalReferrals: int("totalReferrals").default(0),
  totalEarnings: decimal("totalEarnings", { precision: 15, scale: 2 }).default("0"),
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LoanPartner = typeof loanPartners.$inferSelect;
export type InsertLoanPartner = typeof loanPartners.$inferInsert;

/**
 * Partner Referrals - Track referrals from partners
 */
export const partnerReferrals = mysqlTable("partner_referrals", {
  id: int("id").autoincrement().primaryKey(),
  referralId: varchar("referralId", { length: 64 }).notNull().unique(),
  partnerId: varchar("partnerId", { length: 64 }).notNull(),
  applicationId: varchar("applicationId", { length: 64 }).notNull(),
  dealId: varchar("dealId", { length: 64 }),
  referralCommission: decimal("referralCommission", { precision: 15, scale: 2 }),
  status: mysqlEnum("status", ["pending", "qualified", "funded", "paid"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PartnerReferral = typeof partnerReferrals.$inferSelect;
export type InsertPartnerReferral = typeof partnerReferrals.$inferInsert;

/**
 * SERPENT STRIKE BATTALION INTEGRATION
 * Command structure, agent management, and commission tracking
 */

/**
 * Battalion Squads - 5 specialized squads under Shelby's command
 */
export const battalionSquads = mysqlTable("battalion_squads", {
  id: int("id").autoincrement().primaryKey(),
  squadId: varchar("squadId", { length: 64 }).notNull().unique(),
  squadName: varchar("squadName", { length: 100 }).notNull(), // Alpha Strike, Bravo Conversion, etc.
  commanderId: int("commanderId").notNull(), // User ID of squad commander
  focus: mysqlEnum("focus", ["travel", "freelance", "loans", "operations", "creative"]).notNull(),
  description: text("description"),
  agentCount: int("agentCount").default(0),
  totalRevenue: decimal("totalRevenue", { precision: 15, scale: 2 }).default("0"),
  totalCommissions: decimal("totalCommissions", { precision: 15, scale: 2 }).default("0"),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BattalionSquad = typeof battalionSquads.$inferSelect;
export type InsertBattalionSquad = typeof battalionSquads.$inferInsert;

/**
 * Battalion Agents - 30 agents across 5 squads
 */
export const battalionAgents = mysqlTable("battalion_agents", {
  id: int("id").autoincrement().primaryKey(),
  agentId: varchar("agentId", { length: 64 }).notNull().unique(),
  userId: int("userId").notNull().unique(),
  squadId: int("squadId").notNull(), // Foreign key to battalionSquads
  rank: mysqlEnum("rank", ["commander", "xo", "sergeant", "specialist", "recruit"]).default("specialist"),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  profileImage: varchar("profileImage", { length: 500 }),
  specialization: mysqlEnum("specialization", ["travel", "freelance", "loans", "operations", "creative"]).notNull(),
  totalBookings: int("totalBookings").default(0),
  totalProjects: int("totalProjects").default(0),
  totalDeals: int("totalDeals").default(0),
  totalRevenue: decimal("totalRevenue", { precision: 15, scale: 2 }).default("0"),
  totalCommissions: decimal("totalCommissions", { precision: 15, scale: 2 }).default("0"),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).default("5"), // Base rate %
  performanceScore: int("performanceScore").default(0), // 0-100
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active"),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BattalionAgent = typeof battalionAgents.$inferSelect;
export type InsertBattalionAgent = typeof battalionAgents.$inferInsert;

/**
 * Agent Assignments - Link agents to bookings/projects/deals
 */
export const agentAssignments = mysqlTable("agent_assignments", {
  id: int("id").autoincrement().primaryKey(),
  assignmentId: varchar("assignmentId", { length: 64 }).notNull().unique(),
  agentId: int("agentId").notNull(), // Foreign key to battalionAgents
  assignmentType: mysqlEnum("assignmentType", ["flight", "carRental", "cruise", "freelanceProject", "loanDeal"]).notNull(),
  referenceId: int("referenceId").notNull(), // ID of the booking/project/deal
  referenceName: varchar("referenceName", { length: 255 }),
  clientName: varchar("clientName", { length: 200 }),
  transactionAmount: decimal("transactionAmount", { precision: 15, scale: 2 }).notNull(),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  commissionAmount: decimal("commissionAmount", { precision: 15, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "active", "completed", "cancelled"]).default("pending"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentAssignment = typeof agentAssignments.$inferSelect;
export type InsertAgentAssignment = typeof agentAssignments.$inferInsert;

/**
 * Agent Commissions - Track all commissions earned by agents
 */
export const agentCommissions = mysqlTable("agent_commissions", {
  id: int("id").autoincrement().primaryKey(),
  commissionId: varchar("commissionId", { length: 64 }).notNull().unique(),
  agentId: int("agentId").notNull(), // Foreign key to battalionAgents
  assignmentId: int("assignmentId"), // Foreign key to agentAssignments
  pillar: mysqlEnum("pillar", ["travel", "freelance", "loans"]).notNull(),
  transactionType: mysqlEnum("transactionType", ["flight", "carRental", "cruise", "freelanceProject", "loanDeal"]).notNull(),
  transactionAmount: decimal("transactionAmount", { precision: 15, scale: 2 }).notNull(),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).notNull(),
  commissionAmount: decimal("commissionAmount", { precision: 15, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "earned", "paid", "disputed"]).default("pending"),
  paidAt: timestamp("paidAt"),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  stripePayoutId: varchar("stripePayoutId", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentCommission = typeof agentCommissions.$inferSelect;
export type InsertAgentCommission = typeof agentCommissions.$inferInsert;

/**
 * Battalion Performance Metrics - Real-time KPIs
 */
export const battalionMetrics = mysqlTable("battalion_metrics", {
  id: int("id").autoincrement().primaryKey(),
  metricId: varchar("metricId", { length: 64 }).notNull().unique(),
  agentId: int("agentId"), // NULL for squad-level metrics
  squadId: int("squadId"), // NULL for agent-level metrics
  period: mysqlEnum("period", ["daily", "weekly", "monthly", "quarterly", "yearly"]).notNull(),
  periodStart: timestamp("periodStart").notNull(),
  periodEnd: timestamp("periodEnd").notNull(),
  totalTransactions: int("totalTransactions").default(0),
  totalRevenue: decimal("totalRevenue", { precision: 15, scale: 2 }).default("0"),
  totalCommissions: decimal("totalCommissions", { precision: 15, scale: 2 }).default("0"),
  averageTransactionValue: decimal("averageTransactionValue", { precision: 15, scale: 2 }).default("0"),
  conversionRate: decimal("conversionRate", { precision: 5, scale: 2 }).default("0"),
  performanceRank: int("performanceRank"), // Ranking among peers
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BattalionMetric = typeof battalionMetrics.$inferSelect;
export type InsertBattalionMetric = typeof battalionMetrics.$inferInsert;
