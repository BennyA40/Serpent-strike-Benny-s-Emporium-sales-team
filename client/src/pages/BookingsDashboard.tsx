import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Car, Anchor, DollarSign, Calendar, MapPin } from "lucide-react";
import { trpc } from "@/lib/trpc";
import FlightBooking from "@/components/FlightBooking";
import CarRentalBooking from "@/components/CarRentalBooking";
import CruiseBooking from "@/components/CruiseBooking";

export default function BookingsDashboard() {
  const [activeTab, setActiveTab] = useState("flights");

  // Fetch user bookings
  const flightBookings = trpc.bookings.flights.myBookings.useQuery();
  const carBookings = trpc.bookings.cars.myBookings.useQuery();
  const cruiseBookings = trpc.bookings.cruises.myBookings.useQuery();
  const commissions = trpc.bookings.commissions.myCommissions.useQuery();
  const totalEarned = trpc.bookings.commissions.totalEarned.useQuery();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary mb-2">Bookings & Commissions</h1>
          <p className="text-foreground/70">Manage your travel bookings and track your earnings</p>
        </div>
      </div>

      {/* Commission Summary */}
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">Total Commissions Earned</p>
                <p className="text-3xl font-bold text-secondary">
                  ${totalEarned.data ? totalEarned.data.toFixed(2) : "0.00"}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-secondary/20" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">Flight Bookings</p>
                <p className="text-3xl font-bold text-primary">{flightBookings.data?.length || 0}</p>
              </div>
              <Plane className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">Active Bookings</p>
                <p className="text-3xl font-bold text-primary">
                  {(flightBookings.data?.length || 0) +
                    (carBookings.data?.length || 0) +
                    (cruiseBookings.data?.length || 0)}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-primary/20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border p-1 rounded-lg">
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Cars</span>
            </TabsTrigger>
            <TabsTrigger value="cruises" className="flex items-center gap-2">
              <Anchor className="w-4 h-4" />
              <span className="hidden sm:inline">Cruises</span>
            </TabsTrigger>
            <TabsTrigger value="commissions" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Commissions</span>
            </TabsTrigger>
          </TabsList>

          {/* Flight Bookings */}
          <TabsContent value="flights" className="space-y-4">
            {flightBookings.isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : flightBookings.data && flightBookings.data.length > 0 ? (
              <div className="space-y-4">
                {flightBookings.data.map((booking: any) => (
                  <Card key={booking.id} className="p-6 bg-card border-border hover:border-secondary/50 transition-all">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-foreground/60">Route</p>
                        <p className="font-bold text-primary">
                          {booking.departureCity} → {booking.arrivalCity}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Airline</p>
                        <p className="font-bold text-primary">{booking.airline}</p>
                        <p className="text-xs text-foreground">{booking.flightNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Date</p>
                        <p className="font-bold text-primary">
                          {new Date(booking.departureDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-foreground/60">Price</p>
                          <p className="text-xl font-bold text-secondary">${booking.price}</p>
                        </div>
                        <span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 bg-card border border-border text-center">
                <Plane className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">No flight bookings yet</p>
                <Button
                  onClick={() => setActiveTab("book-flights")}
                  className="mt-4 bg-secondary hover:bg-secondary/90 text-primary font-bold py-2 px-4 rounded-lg"
                >
                  Book a Flight
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Car Bookings */}
          <TabsContent value="cars" className="space-y-4">
            {carBookings.isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : carBookings.data && carBookings.data.length > 0 ? (
              <div className="space-y-4">
                {carBookings.data.map((booking: any) => (
                  <Card key={booking.id} className="p-6 bg-card border-border hover:border-secondary/50 transition-all">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-foreground/60">Route</p>
                        <p className="font-bold text-primary">
                          {booking.pickupLocation} → {booking.dropoffLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Car Type</p>
                        <p className="font-bold text-primary">{booking.carType}</p>
                        <p className="text-xs text-foreground">{booking.rentalCompany}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Dates</p>
                        <p className="font-bold text-primary">
                          {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                          {new Date(booking.dropoffDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-foreground/60">Total</p>
                          <p className="text-xl font-bold text-secondary">${booking.totalPrice}</p>
                        </div>
                        <span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 bg-card border border-border text-center">
                <Car className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">No car bookings yet</p>
              </Card>
            )}
          </TabsContent>

          {/* Cruise Bookings */}
          <TabsContent value="cruises" className="space-y-4">
            {cruiseBookings.isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : cruiseBookings.data && cruiseBookings.data.length > 0 ? (
              <div className="space-y-4">
                {cruiseBookings.data.map((booking: any) => (
                  <Card key={booking.id} className="p-6 bg-card border-border hover:border-secondary/50 transition-all">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-foreground/60">Cruise Line</p>
                        <p className="font-bold text-primary">{booking.cruiseLine}</p>
                        <p className="text-xs text-foreground">{booking.ship}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Port</p>
                        <p className="font-bold text-primary">{booking.departurePort}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Dates</p>
                        <p className="font-bold text-primary">
                          {new Date(booking.departureDate).toLocaleDateString()} -{" "}
                          {new Date(booking.returnDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-foreground/60">Total</p>
                          <p className="text-xl font-bold text-secondary">${booking.totalPrice}</p>
                        </div>
                        <span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 bg-card border border-border text-center">
                <Anchor className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">No cruise bookings yet</p>
              </Card>
            )}
          </TabsContent>

          {/* Commissions */}
          <TabsContent value="commissions" className="space-y-4">
            {commissions.isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : commissions.data && commissions.data.length > 0 ? (
              <div className="space-y-4">
                {commissions.data.map((commission: any) => (
                  <Card key={commission.id} className="p-6 bg-card border-border hover:border-secondary/50 transition-all">
                    <div className="grid md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-foreground/60">Booking Type</p>
                        <p className="font-bold text-primary capitalize">{commission.bookingType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Booking Amount</p>
                        <p className="font-bold text-primary">${commission.bookingAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Commission Rate</p>
                        <p className="font-bold text-primary">{commission.commissionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60">Commission Earned</p>
                        <p className="text-xl font-bold text-secondary">${commission.commissionAmount}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            commission.status === "paid"
                              ? "bg-green-500/20 text-green-600"
                              : commission.status === "earned"
                                ? "bg-blue-500/20 text-blue-600"
                                : "bg-yellow-500/20 text-yellow-600"
                          }`}
                        >
                          {commission.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 bg-card border border-border text-center">
                <DollarSign className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">No commissions earned yet</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
