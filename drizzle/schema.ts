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
