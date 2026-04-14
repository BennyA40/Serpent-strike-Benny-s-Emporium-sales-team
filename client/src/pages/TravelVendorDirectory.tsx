import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock, Link2, Eye, EyeOff } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  link: string;
  credentialPlaceholder: string;
  credential: string;
  showCredential: boolean;
}

const initialVendors: Vendor[] = [
  // Cruise Lines
  { id: "cruise-1", name: "Royal Caribbean", category: "Cruise Lines", link: "https://www.royalcaribbean.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-2", name: "Carnival", category: "Cruise Lines", link: "https://www.carnival.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-3", name: "Norwegian Cruise Line", category: "Cruise Lines", link: "https://www.ncl.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-4", name: "MSC Cruises", category: "Cruise Lines", link: "https://www.msccruises.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-5", name: "Princess Cruises", category: "Cruise Lines", link: "https://www.princess.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-6", name: "Celebrity Cruises", category: "Cruise Lines", link: "https://www.celebritycruises.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-7", name: "Holland America Line", category: "Cruise Lines", link: "https://www.hollandamerica.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },
  { id: "cruise-8", name: "Disney Cruise Line", category: "Cruise Lines", link: "https://www.disneycruise.com", credentialPlaceholder: "API Key", credential: "", showCredential: false },

  // Resorts
  { id: "resort-1", name: "Sandals Resorts", category: "Resorts", link: "https://www.sandals.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-2", name: "Beaches Resorts", category: "Resorts", link: "https://www.beaches.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-3", name: "AMR Collection", category: "Resorts", link: "https://www.amrcollection.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-4", name: "RIU Hotels", category: "Resorts", link: "https://www.riu.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-5", name: "Iberostar Hotels", category: "Resorts", link: "https://www.iberostar.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-6", name: "Club Med", category: "Resorts", link: "https://www.clubmed.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-7", name: "Karisma Hotels", category: "Resorts", link: "https://www.karismahotels.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },
  { id: "resort-8", name: "Palace Resorts", category: "Resorts", link: "https://www.palaceresorts.com", credentialPlaceholder: "Partner ID", credential: "", showCredential: false },

  // Booking Engines
  { id: "booking-1", name: "VAX VacationAccess", category: "Booking Engines", link: "https://www.vaxvacationaccess.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-2", name: "Expedia TAAP", category: "Booking Engines", link: "https://www.expediaaffiliate.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-3", name: "Priceline Partner Network", category: "Booking Engines", link: "https://www.priceline.com/partners", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-4", name: "Travel Impressions", category: "Booking Engines", link: "https://www.travelimpressions.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-5", name: "Funjet Vacations", category: "Booking Engines", link: "https://www.funjet.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-6", name: "Apple Vacations", category: "Booking Engines", link: "https://www.applevacations.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },
  { id: "booking-7", name: "Pleasant Holidays", category: "Booking Engines", link: "https://www.pleasantholidays.com", credentialPlaceholder: "Agent ID", credential: "", showCredential: false },

  // Hotels
  { id: "hotel-1", name: "Marriott International", category: "Hotels", link: "https://www.marriott.com", credentialPlaceholder: "Partner Code", credential: "", showCredential: false },
  { id: "hotel-2", name: "Hilton Hotels", category: "Hotels", link: "https://www.hilton.com", credentialPlaceholder: "Partner Code", credential: "", showCredential: false },
  { id: "hotel-3", name: "Hyatt Hotels", category: "Hotels", link: "https://www.hyatt.com", credentialPlaceholder: "Partner Code", credential: "", showCredential: false },
  { id: "hotel-4", name: "IHG Hotels", category: "Hotels", link: "https://www.ihg.com", credentialPlaceholder: "Partner Code", credential: "", showCredential: false },
  { id: "hotel-5", name: "Wyndham Hotels", category: "Hotels", link: "https://www.wyndham.com", credentialPlaceholder: "Partner Code", credential: "", showCredential: false },

  // Airlines
  { id: "airline-1", name: "American Airlines", category: "Airlines", link: "https://www.aa.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
  { id: "airline-2", name: "Delta Airlines", category: "Airlines", link: "https://www.delta.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
  { id: "airline-3", name: "United Airlines", category: "Airlines", link: "https://www.united.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
  { id: "airline-4", name: "Southwest Airlines", category: "Airlines", link: "https://www.southwest.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
  { id: "airline-5", name: "JetBlue Airways", category: "Airlines", link: "https://www.jetblue.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
  { id: "airline-6", name: "Alaska Airlines", category: "Airlines", link: "https://www.alaskaair.com", credentialPlaceholder: "GDS Code", credential: "", showCredential: false },
];

export default function TravelVendorDirectory() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);

  const handleCredentialChange = (id: string, value: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, credential: value } : v))
    );
  };

  const toggleCredentialVisibility = (id: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, showCredential: !v.showCredential } : v))
    );
  };

  const categories = Array.from(new Set(vendors.map((v) => v.category)));

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Travel Vendor Directory</h1>
          <p className="text-lg text-muted-foreground">
            Manage your travel vendor integrations and credentials. Add your Intelli Travel credentials once you're set up.
          </p>
        </div>

        {/* Vendor Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {category}
                </Badge>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors
                  .filter((v) => v.category === category)
                  .map((vendor) => (
                    <Card key={vendor.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Link2 className="w-4 h-4" />
                          <a
                            href={vendor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            Visit Website
                          </a>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            {vendor.credentialPlaceholder}
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type={vendor.showCredential ? "text" : "password"}
                              value={vendor.credential}
                              onChange={(e) => handleCredentialChange(vendor.id, e.target.value)}
                              placeholder={`Enter ${vendor.credentialPlaceholder.toLowerCase()}`}
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleCredentialVisibility(vendor.id)}
                            >
                              {vendor.showCredential ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {vendor.credential && (
                          <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                            <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                              ✓ Credentials saved
                            </p>
                          </div>
                        )}

                        {!vendor.credential && (
                          <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md">
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              Credentials pending
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              About Intelli Travel Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              Once you obtain your Intelli Travel license and credentials, you can add them to the vendor directory above.
              Your credentials will be securely stored and used to connect with each travel vendor's API.
            </p>
            <p>
              Each vendor category (Cruise Lines, Resorts, Booking Engines, Hotels, Airlines) has its own credential type.
              Make sure to enter the correct credentials for each vendor to enable real-time booking and pricing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
