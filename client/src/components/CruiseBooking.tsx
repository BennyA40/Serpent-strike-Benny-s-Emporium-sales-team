import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Anchor, MapPin, Calendar, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CruiseBooking() {
  const [searchParams, setSearchParams] = useState({
    departurePort: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });

  const [selectedCruise, setSelectedCruise] = useState<any>(null);

  const searchCruises = trpc.bookings.cruises.search.useQuery(
    {
      departurePort: searchParams.departurePort,
      departureDate: searchParams.departureDate ? new Date(searchParams.departureDate) : new Date(),
      returnDate: searchParams.returnDate ? new Date(searchParams.returnDate) : new Date(),
      passengers: searchParams.passengers,
    },
    {
      enabled: !!(searchParams.departurePort && searchParams.departureDate && searchParams.returnDate),
    }
  );

  const bookCruise = trpc.bookings.cruises.book.useMutation({
    onSuccess: (data) => {
      toast.success(`Cruise booked! Reference: ${data.bookingReference}`);
      setSelectedCruise(null);
      setSearchParams({
        departurePort: "",
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
    if (!searchParams.departurePort || !searchParams.departureDate || !searchParams.returnDate) {
      toast.error("Please fill in all required fields");
      return;
    }
  };

  const handleBookCruise = (cruise: any) => {
    if (!selectedCruise) {
      setSelectedCruise(cruise);
      return;
    }

    bookCruise.mutate({
      cruiseLine: cruise.line,
      ship: cruise.ship,
      departurePort: searchParams.departurePort,
      destinationPorts: cruise.destinationPorts,
      departureDate: new Date(searchParams.departureDate),
      returnDate: new Date(searchParams.returnDate),
      cabinType: cruise.cabinType,
      passengers: searchParams.passengers,
      pricePerPerson: cruise.pricePerPerson,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Anchor className="w-8 h-8 text-secondary" />
        <h2 className="text-3xl font-bold text-primary">Cruise Booking</h2>
      </div>

      {/* Search Form */}
      <Card className="p-6 bg-card border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Departure Port</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <MapPin className="w-4 h-4 text-secondary" />
              <Input
                type="text"
                placeholder="Port city"
                value={searchParams.departurePort}
                onChange={(e) => setSearchParams({ ...searchParams, departurePort: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Departure Date</Label>
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
            <Label className="text-foreground font-semibold">Return Date</Label>
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
          Search Cruises
        </Button>
      </Card>

      {/* Search Results */}
      {searchCruises.isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-4 text-foreground">Searching cruises...</p>
        </div>
      )}

      {searchCruises.data?.cruises && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary mb-4">Available Cruises</h3>
          {searchCruises.data.cruises.map((cruise: any, idx: number) => (
            <Card
              key={idx}
              className={`p-6 border-2 cursor-pointer transition-all ${
                selectedCruise?.id === cruise.id
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50"
              }`}
              onClick={() => setSelectedCruise(cruise)}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-foreground/60">Cruise Line</p>
                  <p className="font-bold text-primary text-lg">{cruise.line}</p>
                  <p className="text-sm text-foreground mt-1">{cruise.ship}</p>

                  <div className="mt-4">
                    <p className="text-sm text-foreground/60">Destinations</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cruise.destinationPorts.map((port: string, idx: number) => (
                        <span key={idx} className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-foreground/60">Cabin Type</p>
                    <p className="font-bold text-primary">{cruise.cabinType}</p>

                    <div className="mt-4">
                      <p className="text-sm text-foreground/60">Price Per Person</p>
                      <p className="text-2xl font-bold text-secondary">${cruise.pricePerPerson}</p>
                      <p className="text-xs text-foreground/60 mt-1">
                        Total: ${cruise.pricePerPerson * searchParams.passengers} for {searchParams.passengers} passenger(s)
                      </p>
                    </div>

                    <p className="text-xs text-foreground/60 mt-2">{cruise.availability} cabins available</p>
                  </div>

                  <Button
                    onClick={() => handleBookCruise(cruise)}
                    disabled={bookCruise.isPending}
                    className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-2 px-4 rounded-lg w-full"
                  >
                    {bookCruise.isPending ? "Booking..." : selectedCruise?.id === cruise.id ? "Confirm Booking" : "Select Cruise"}
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
