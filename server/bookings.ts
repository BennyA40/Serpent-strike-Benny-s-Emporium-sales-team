import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import {
  flightBookings,
  carRentalBookings,
  cruiseBookings,
  commissions,
  bookingQuotes,
  InsertFlightBooking,
  InsertCarRentalBooking,
  InsertCruiseBooking,
  InsertCommission,
  InsertBookingQuote,
} from "../drizzle/schema";

/**
 * Flight Booking Operations
 */
export async function createFlightBooking(booking: InsertFlightBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(flightBookings).values(booking);
  return result;
}

export async function getUserFlightBookings(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(flightBookings).where(eq(flightBookings.userId, userId));
}

export async function getFlightBookingByReference(reference: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(flightBookings)
    .where(eq(flightBookings.bookingReference, reference))
    .limit(1);
  
  return result[0];
}

/**
 * Car Rental Booking Operations
 */
export async function createCarRentalBooking(booking: InsertCarRentalBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(carRentalBookings).values(booking);
}

export async function getUserCarRentalBookings(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(carRentalBookings).where(eq(carRentalBookings.userId, userId));
}

export async function getCarRentalBookingByReference(reference: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(carRentalBookings)
    .where(eq(carRentalBookings.bookingReference, reference))
    .limit(1);
  
  return result[0];
}

/**
 * Cruise Booking Operations
 */
export async function createCruiseBooking(booking: InsertCruiseBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(cruiseBookings).values(booking);
}

export async function getUserCruiseBookings(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(cruiseBookings).where(eq(cruiseBookings.userId, userId));
}

export async function getCruiseBookingByReference(reference: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(cruiseBookings)
    .where(eq(cruiseBookings.bookingReference, reference))
    .limit(1);
  
  return result[0];
}

/**
 * Commission Operations
 */
export async function createCommission(commission: InsertCommission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(commissions).values(commission);
}

export async function getUserCommissions(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(commissions).where(eq(commissions.userId, userId));
}

export async function getTotalUserCommissions(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(commissions)
    .where(eq(commissions.userId, userId));
  
  return result.reduce((total, comm) => {
    return total + parseFloat(comm.commissionAmount.toString());
  }, 0);
}

/**
 * Booking Quote Operations
 */
export async function createBookingQuote(quote: InsertBookingQuote) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(bookingQuotes).values(quote);
}

export async function getUserBookingQuotes(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(bookingQuotes).where(eq(bookingQuotes.userId, userId));
}

export async function getAllPendingQuotes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(bookingQuotes)
    .where(eq(bookingQuotes.status, "pending"));
}
