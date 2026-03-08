import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, MapPin, Calendar, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function FlightBooking() {
  const [searchParams, setSearchParams] = useState({
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });

  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const searchFlights = trpc.bookings.flights.search.useQuery(
    {
      departureCity: searchParams.departureCity,
      arrivalCity: searchParams.arrivalCity,
      departureDate: searchParams.departureDate ? new Date(searchParams.departureDate) : new Date(),
      returnDate: searchParams.returnDate ? new Date(searchParams.returnDate) : undefined,
      passengers: searchParams.passengers,
    },
    {
      enabled: !!(searchParams.departureCity && searchParams.arrivalCity && searchParams.departureDate),
    }
  );

  const bookFlight = trpc.bookings.flights.book.useMutation({
    onSuccess: (data) => {
      toast.success(`Flight booked! Reference: ${data.bookingReference}`);
      setSelectedFlight(null);
      setSearchParams({
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        returnDate: "",
        passengers: 1,
      });
    },
    onError: (error) => {
      toast.error(`Booking failed: ${error.message}`);
    },
  });

  const handleSearch = () => {
    if (!searchParams.departureCity || !searchParams.arrivalCity || !searchParams.departureDate) {
      toast.error("Please fill in all required fields");
      return;
    }
  };

  const handleBookFlight = (flight: any) => {
    if (!selectedFlight) {
      setSelectedFlight(flight);
      return;
    }

    bookFlight.mutate({
      departureCity: searchParams.departureCity,
      arrivalCity: searchParams.arrivalCity,
      departureDate: new Date(searchParams.departureDate),
      returnDate: searchParams.returnDate ? new Date(searchParams.returnDate) : undefined,
      passengers: searchParams.passengers,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      price: flight.price,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Plane className="w-8 h-8 text-secondary" />
        <h2 className="text-3xl font-bold text-primary">Flight Booking</h2>
      </div>

      {/* Search Form */}
      <Card className="p-6 bg-card border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">From</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <MapPin className="w-4 h-4 text-secondary" />
              <Input
                type="text"
                placeholder="Departure city"
                value={searchParams.departureCity}
                onChange={(e) => setSearchParams({ ...searchParams, departureCity: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">To</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <MapPin className="w-4 h-4 text-secondary" />
              <Input
                type="text"
                placeholder="Arrival city"
                value={searchParams.arrivalCity}
                onChange={(e) => setSearchParams({ ...searchParams, arrivalCity: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Depart</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <Calendar className="w-4 h-4 text-secondary" />
              <Input
                type="date"
                value={searchParams.departureDate}
                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Return</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <Calendar className="w-4 h-4 text-secondary" />
              <Input
                type="date"
                value={searchParams.returnDate}
                onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Passengers</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <Users className="w-4 h-4 text-secondary" />
              <Input
                type="number"
                min="1"
                max="9"
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-lg"
        >
          Search Flights
        </Button>
      </Card>

      {/* Search Results */}
      {searchFlights.isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-4 text-foreground">Searching flights...</p>
        </div>
      )}

      {searchFlights.data?.flights && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary mb-4">Available Flights</h3>
          {searchFlights.data.flights.map((flight: any, idx: number) => (
            <Card
              key={idx}
              className={`p-6 border-2 cursor-pointer transition-all ${
                selectedFlight?.id === flight.id
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50"
              }`}
              onClick={() => setSelectedFlight(flight)}
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-sm text-foreground/60">Airline</p>
                  <p className="font-bold text-primary">{flight.airline}</p>
                  <p className="text-sm text-foreground">{flight.flightNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/60">Departure</p>
                  <p className="font-bold text-primary">
                    {new Date(flight.departure).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-foreground/60">Arrival</p>
                  <p className="font-bold text-primary">
                    {new Date(flight.arrival).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-secondary">${flight.price}</p>
                    <p className="text-xs text-foreground/60">{flight.seats} seats available</p>
                  </div>
                  <Button
                    onClick={() => handleBookFlight(flight)}
                    disabled={bookFlight.isPending}
                    className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-2 px-4 rounded-lg"
                  >
                    {bookFlight.isPending ? "Booking..." : selectedFlight?.id === flight.id ? "Confirm" : "Select"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
