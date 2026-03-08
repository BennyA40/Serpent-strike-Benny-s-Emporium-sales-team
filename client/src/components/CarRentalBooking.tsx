import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, MapPin, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CarRentalBooking() {
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
  });

  const [selectedCar, setSelectedCar] = useState<any>(null);

  const searchCars = trpc.bookings.cars.search.useQuery(
    {
      pickupLocation: searchParams.pickupLocation,
      dropoffLocation: searchParams.dropoffLocation,
      pickupDate: searchParams.pickupDate ? new Date(searchParams.pickupDate) : new Date(),
      dropoffDate: searchParams.dropoffDate ? new Date(searchParams.dropoffDate) : new Date(),
    },
    {
      enabled: !!(
        searchParams.pickupLocation &&
        searchParams.dropoffLocation &&
        searchParams.pickupDate &&
        searchParams.dropoffDate
      ),
    }
  );

  const bookCar = trpc.bookings.cars.book.useMutation({
    onSuccess: (data) => {
      toast.success(`Car booked! Reference: ${data.bookingReference}`);
      setSelectedCar(null);
      setSearchParams({
        pickupLocation: "",
        dropoffLocation: "",
        pickupDate: "",
        dropoffDate: "",
      });
    },
    onError: (error) => {
      toast.error(`Booking failed: ${error.message}`);
    },
  });

  const handleSearch = () => {
    if (
      !searchParams.pickupLocation ||
      !searchParams.dropoffLocation ||
      !searchParams.pickupDate ||
      !searchParams.dropoffDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
  };

  const handleBookCar = (car: any) => {
    if (!selectedCar) {
      setSelectedCar(car);
      return;
    }

    bookCar.mutate({
      pickupLocation: searchParams.pickupLocation,
      dropoffLocation: searchParams.dropoffLocation,
      pickupDate: new Date(searchParams.pickupDate),
      dropoffDate: new Date(searchParams.dropoffDate),
      carType: car.type,
      rentalCompany: car.company,
      dailyRate: car.dailyRate,
      totalPrice: car.totalPrice,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Car className="w-8 h-8 text-secondary" />
        <h2 className="text-3xl font-bold text-primary">Car Rental</h2>
      </div>

      {/* Search Form */}
      <Card className="p-6 bg-card border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Pickup Location</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <MapPin className="w-4 h-4 text-secondary" />
              <Input
                type="text"
                placeholder="Pickup city"
                value={searchParams.pickupLocation}
                onChange={(e) => setSearchParams({ ...searchParams, pickupLocation: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Dropoff Location</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <MapPin className="w-4 h-4 text-secondary" />
              <Input
                type="text"
                placeholder="Dropoff city"
                value={searchParams.dropoffLocation}
                onChange={(e) => setSearchParams({ ...searchParams, dropoffLocation: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Pickup Date</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <Calendar className="w-4 h-4 text-secondary" />
              <Input
                type="date"
                value={searchParams.pickupDate}
                onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Dropoff Date</Label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
              <Calendar className="w-4 h-4 text-secondary" />
              <Input
                type="date"
                value={searchParams.dropoffDate}
                onChange={(e) => setSearchParams({ ...searchParams, dropoffDate: e.target.value })}
                className="border-0 bg-transparent focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-lg"
        >
          Search Cars
        </Button>
      </Card>

      {/* Search Results */}
      {searchCars.isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-4 text-foreground">Searching cars...</p>
        </div>
      )}

      {searchCars.data?.cars && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary mb-4">Available Cars</h3>
          {searchCars.data.cars.map((car: any, idx: number) => (
            <Card
              key={idx}
              className={`p-6 border-2 cursor-pointer transition-all ${
                selectedCar?.id === car.id ? "border-secondary bg-secondary/10" : "border-border hover:border-secondary/50"
              }`}
              onClick={() => setSelectedCar(car)}
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-sm text-foreground/60">Car Type</p>
                  <p className="font-bold text-primary text-lg">{car.type}</p>
                  <p className="text-sm text-foreground">{car.transmission}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/60">Rental Company</p>
                  <p className="font-bold text-primary">{car.company}</p>
                  <p className="text-sm text-foreground">{car.seats} seats</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/60">Daily Rate</p>
                  <p className="font-bold text-secondary">${car.dailyRate}/day</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-secondary">${car.totalPrice}</p>
                    <p className="text-xs text-foreground/60">Total</p>
                  </div>
                  <Button
                    onClick={() => handleBookCar(car)}
                    disabled={bookCar.isPending}
                    className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-2 px-4 rounded-lg"
                  >
                    {bookCar.isPending ? "Booking..." : selectedCar?.id === car.id ? "Confirm" : "Select"}
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
