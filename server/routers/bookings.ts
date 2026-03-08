import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  createFlightBooking,
  getUserFlightBookings,
  getFlightBookingByReference,
  createCarRentalBooking,
  getUserCarRentalBookings,
  getCarRentalBookingByReference,
  createCruiseBooking,
  getUserCruiseBookings,
  getCruiseBookingByReference,
  createCommission,
  getUserCommissions,
  getTotalUserCommissions,
  createBookingQuote,
  getUserBookingQuotes,
  getAllPendingQuotes,
} from "../bookings";
import { nanoid } from "nanoid";

/**
 * Flight Booking Procedures
 */
const flightRouter = router({
  search: publicProcedure
    .input(
      z.object({
        departureCity: z.string(),
        arrivalCity: z.string(),
        departureDate: z.date(),
        returnDate: z.date().optional(),
        passengers: z.number().default(1),
      })
    )
    .query(async ({ input }) => {
      // TODO: Integrate SABRE GDS API here
      // For now, return mock data
      return {
        flights: [
          {
            id: "FL001",
            airline: "United Airlines",
            flightNumber: "UA456",
            departure: input.departureDate,
            arrival: new Date(input.departureDate.getTime() + 5 * 60 * 60 * 1000),
            price: 450,
            seats: 12,
          },
          {
            id: "FL002",
            airline: "Delta Air Lines",
            flightNumber: "DL789",
            departure: new Date(input.departureDate.getTime() + 2 * 60 * 60 * 1000),
            arrival: new Date(input.departureDate.getTime() + 7 * 60 * 60 * 1000),
            price: 520,
            seats: 8,
          },
        ],
      };
    }),

  book: protectedProcedure
    .input(
      z.object({
        departureCity: z.string(),
        arrivalCity: z.string(),
        departureDate: z.date(),
        returnDate: z.date().optional(),
        passengers: z.number(),
        airline: z.string(),
        flightNumber: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const bookingRef = `FL-${nanoid(8)}`;
      
      await createFlightBooking({
        userId: ctx.user.id,
        bookingReference: bookingRef,
        departureCity: input.departureCity,
        arrivalCity: input.arrivalCity,
        departureDate: input.departureDate,
        returnDate: input.returnDate,
        passengers: input.passengers,
        airline: input.airline,
        flightNumber: input.flightNumber,
        price: input.price.toString(),
        status: "confirmed",
      });

      // Create commission record (default 10% commission)
      const commissionAmount = input.price * 0.1;
      await createCommission({
        bookingType: "flight",
        bookingId: 1, // TODO: Get actual booking ID
        userId: ctx.user.id,
        bookingAmount: input.price.toString(),
        commissionRate: "10",
        commissionAmount: commissionAmount.toString(),
      });

      return { bookingReference: bookingRef, status: "confirmed" };
    }),

  myBookings: protectedProcedure.query(async ({ ctx }) => {
    return await getUserFlightBookings(ctx.user.id);
  }),

  getBooking: protectedProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input }) => {
      return await getFlightBookingByReference(input.reference);
    }),
});

/**
 * Car Rental Booking Procedures
 */
const carRentalRouter = router({
  search: publicProcedure
    .input(
      z.object({
        pickupLocation: z.string(),
        dropoffLocation: z.string(),
        pickupDate: z.date(),
        dropoffDate: z.date(),
        carType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      // TODO: Integrate Rentalcars.com or Hertz API here
      const days = Math.ceil(
        (input.dropoffDate.getTime() - input.pickupDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        cars: [
          {
            id: "CAR001",
            type: "Economy",
            company: "Hertz",
            dailyRate: 45,
            totalPrice: 45 * days,
            seats: 5,
            transmission: "Automatic",
          },
          {
            id: "CAR002",
            type: "SUV",
            company: "Avis",
            dailyRate: 75,
            totalPrice: 75 * days,
            seats: 7,
            transmission: "Automatic",
          },
        ],
      };
    }),

  book: protectedProcedure
    .input(
      z.object({
        pickupLocation: z.string(),
        dropoffLocation: z.string(),
        pickupDate: z.date(),
        dropoffDate: z.date(),
        carType: z.string(),
        rentalCompany: z.string(),
        dailyRate: z.number(),
        totalPrice: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const bookingRef = `CAR-${nanoid(8)}`;

      await createCarRentalBooking({
        userId: ctx.user.id,
        bookingReference: bookingRef,
        pickupLocation: input.pickupLocation,
        dropoffLocation: input.dropoffLocation,
        pickupDate: input.pickupDate,
        dropoffDate: input.dropoffDate,
        carType: input.carType,
        rentalCompany: input.rentalCompany,
        dailyRate: input.dailyRate.toString(),
        totalPrice: input.totalPrice.toString(),
        status: "confirmed",
      });

      // Create commission record (default 8% commission)
      const commissionAmount = input.totalPrice * 0.08;
      await createCommission({
        bookingType: "carRental",
        bookingId: 1, // TODO: Get actual booking ID
        userId: ctx.user.id,
        bookingAmount: input.totalPrice.toString(),
        commissionRate: "8",
        commissionAmount: commissionAmount.toString(),
      });

      return { bookingReference: bookingRef, status: "confirmed" };
    }),

  myBookings: protectedProcedure.query(async ({ ctx }) => {
    return await getUserCarRentalBookings(ctx.user.id);
  }),

  getBooking: protectedProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input }) => {
      return await getCarRentalBookingByReference(input.reference);
    }),
});

/**
 * Cruise Booking Procedures
 */
const cruiseRouter = router({
  search: publicProcedure
    .input(
      z.object({
        departurePort: z.string(),
        departureDate: z.date(),
        returnDate: z.date(),
        passengers: z.number().default(1),
        cabinType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      // TODO: Integrate CruCom or Cruise Direct API here
      return {
        cruises: [
          {
            id: "CRUISE001",
            line: "Royal Caribbean",
            ship: "Symphony of the Seas",
            departurePort: input.departurePort,
            destinationPorts: ["Bermuda", "Puerto Rico", "US Virgin Islands"],
            departure: input.departureDate,
            return: input.returnDate,
            pricePerPerson: 1200,
            cabinType: "Interior",
            availability: 15,
          },
          {
            id: "CRUISE002",
            line: "Carnival Cruise Line",
            ship: "Carnival Panorama",
            departurePort: input.departurePort,
            destinationPorts: ["Cabo San Lucas", "Puerto Vallarta", "Mazatlán"],
            departure: input.departureDate,
            return: input.returnDate,
            pricePerPerson: 950,
            cabinType: "Oceanview",
            availability: 20,
          },
        ],
      };
    }),

  book: protectedProcedure
    .input(
      z.object({
        cruiseLine: z.string(),
        ship: z.string(),
        departurePort: z.string(),
        destinationPorts: z.array(z.string()),
        departureDate: z.date(),
        returnDate: z.date(),
        cabinType: z.string(),
        passengers: z.number(),
        pricePerPerson: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const bookingRef = `CRUISE-${nanoid(8)}`;
      const totalPrice = input.pricePerPerson * input.passengers;

      await createCruiseBooking({
        userId: ctx.user.id,
        bookingReference: bookingRef,
        cruiseLine: input.cruiseLine,
        ship: input.ship,
        departurePort: input.departurePort,
        destinationPorts: JSON.stringify(input.destinationPorts),
        departureDate: input.departureDate,
        returnDate: input.returnDate,
        cabinType: input.cabinType,
        passengers: input.passengers,
        pricePerPerson: input.pricePerPerson.toString(),
        totalPrice: totalPrice.toString(),
        status: "confirmed",
      });

      // Create commission record (default 12% commission)
      const commissionAmount = totalPrice * 0.12;
      await createCommission({
        bookingType: "cruise",
        bookingId: 1, // TODO: Get actual booking ID
        userId: ctx.user.id,
        bookingAmount: totalPrice.toString(),
        commissionRate: "12",
        commissionAmount: commissionAmount.toString(),
      });

      return { bookingReference: bookingRef, status: "confirmed" };
    }),

  myBookings: protectedProcedure.query(async ({ ctx }) => {
    return await getUserCruiseBookings(ctx.user.id);
  }),

  getBooking: protectedProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input }) => {
      return await getCruiseBookingByReference(input.reference);
    }),
});

/**
 * Commission & Quote Procedures
 */
const commissionsRouter = router({
  myCommissions: protectedProcedure.query(async ({ ctx }) => {
    return await getUserCommissions(ctx.user.id);
  }),

  totalEarned: protectedProcedure.query(async ({ ctx }) => {
    return await getTotalUserCommissions(ctx.user.id);
  }),
});

const quotesRouter = router({
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        bookingType: z.enum(["flight", "carRental", "cruise", "custom"]),
        details: z.record(z.string(), z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const quoteId = await createBookingQuote({
        email: input.email,
        name: input.name,
        bookingType: input.bookingType,
        details: input.details,
        status: "pending",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      return { quoteId, status: "pending" };
    }),

  myQuotes: protectedProcedure.query(async ({ ctx }) => {
    return await getUserBookingQuotes(ctx.user.id);
  }),

  allPending: protectedProcedure.query(async ({ ctx }) => {
    // Only admins can see all pending quotes
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return await getAllPendingQuotes();
  }),
});

export const bookingsRouter = router({
  flights: flightRouter,
  cars: carRentalRouter,
  cruises: cruiseRouter,
  commissions: commissionsRouter,
  quotes: quotesRouter,
});
