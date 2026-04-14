import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Users, Calendar, DollarSign, Star, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

interface Package {
  id: string;
  name: string;
  category: "travel" | "freelance" | "loans";
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image?: string;
  features: string[];
}

const packages: Package[] = [
  // Travel Packages
  {
    id: "travel-1",
    name: "Parisian Romance Getaway",
    category: "travel",
    description: "5-day luxury escape in Paris with fine dining and cultural tours",
    price: 3500,
    duration: "5 days",
    rating: 4.9,
    reviews: 128,
    features: ["Flights", "5-star hotel", "Guided tours", "Michelin dining"],
  },
  {
    id: "travel-2",
    name: "Bali Wellness Retreat",
    category: "travel",
    description: "7-day spa and meditation retreat in Bali",
    price: 2800,
    duration: "7 days",
    rating: 4.8,
    reviews: 95,
    features: ["Flights", "Resort stay", "Daily yoga", "Spa treatments"],
  },
  {
    id: "travel-3",
    name: "Tokyo Culinary Journey",
    category: "travel",
    description: "6-day food tour exploring Tokyo's best restaurants and street food",
    price: 3200,
    duration: "6 days",
    rating: 4.9,
    reviews: 156,
    features: ["Flights", "Hotel", "Chef-led tours", "Cooking classes"],
  },
  {
    id: "travel-4",
    name: "Caribbean Yacht Cruise",
    category: "travel",
    description: "7-day luxury yacht experience across Caribbean islands",
    price: 5500,
    duration: "7 days",
    rating: 4.7,
    reviews: 82,
    features: ["Yacht", "All meals", "Water sports", "Island tours"],
  },
  {
    id: "travel-5",
    name: "New York City Explorer",
    category: "travel",
    description: "4-day immersive NYC experience with Broadway shows and rooftop dining",
    price: 2200,
    duration: "4 days",
    rating: 4.8,
    reviews: 203,
    features: ["Hotel", "Broadway tickets", "City tours", "Fine dining"],
  },
  {
    id: "travel-6",
    name: "Dubai Luxury Escape",
    category: "travel",
    description: "5-day ultra-luxury experience in Dubai with desert safari and yacht",
    price: 4800,
    duration: "5 days",
    rating: 4.9,
    reviews: 67,
    features: ["Flights", "Luxury hotel", "Safari", "Yacht dinner"],
  },

  // Freelance Packages
  {
    id: "freelance-1",
    name: "Brand Identity Design",
    category: "freelance",
    description: "Complete brand identity package including logo, colors, and guidelines",
    price: 1500,
    duration: "2 weeks",
    rating: 4.9,
    reviews: 234,
    features: ["Logo design", "Color palette", "Typography", "Brand guidelines"],
  },
  {
    id: "freelance-2",
    name: "Website Development",
    category: "freelance",
    description: "Full-stack web development for your business",
    price: 5000,
    duration: "4 weeks",
    rating: 4.8,
    reviews: 189,
    features: ["Responsive design", "Backend", "SEO", "Deployment"],
  },
  {
    id: "freelance-3",
    name: "Content Writing Package",
    category: "freelance",
    description: "Professional copywriting for marketing and web content",
    price: 800,
    duration: "1 week",
    rating: 4.7,
    reviews: 312,
    features: ["Blog posts", "Landing pages", "Email copy", "SEO optimized"],
  },
  {
    id: "freelance-4",
    name: "Video Editing Service",
    category: "freelance",
    description: "Professional video editing for social media and marketing",
    price: 2000,
    duration: "2 weeks",
    rating: 4.9,
    reviews: 156,
    features: ["Color grading", "Motion graphics", "Sound design", "4K export"],
  },
  {
    id: "freelance-5",
    name: "Business Consulting",
    category: "freelance",
    description: "Strategic business consulting for growth and optimization",
    price: 3500,
    duration: "3 weeks",
    rating: 4.8,
    reviews: 98,
    features: ["Strategy session", "Market analysis", "Implementation plan", "Follow-up"],
  },

  // Loan Packages
  {
    id: "loans-1",
    name: "Small Business Startup Loan",
    category: "loans",
    description: "Quick funding for new business ventures up to $50,000",
    price: 0,
    duration: "24 hours approval",
    rating: 4.8,
    reviews: 445,
    features: ["Fast approval", "Flexible terms", "Low rates", "No collateral"],
  },
  {
    id: "loans-2",
    name: "Personal Consolidation Loan",
    category: "loans",
    description: "Consolidate multiple debts into one manageable payment",
    price: 0,
    duration: "48 hours approval",
    rating: 4.7,
    reviews: 523,
    features: ["Lower rates", "Single payment", "Flexible terms", "Credit building"],
  },
  {
    id: "loans-3",
    name: "Real Estate Investment Loan",
    category: "loans",
    description: "Funding for real estate projects and property investments",
    price: 0,
    duration: "5 days approval",
    rating: 4.9,
    reviews: 267,
    features: ["Large amounts", "Competitive rates", "Expert guidance", "Fast closing"],
  },
];

export default function Packages() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"travel" | "freelance" | "loans" | "all">("all");

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "travel":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "freelance":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "loans":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Browse Packages</h1>
          <p className="text-lg text-muted-foreground">
            Explore curated packages across Travel, Freelance Services, and Loans
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {["all", "travel", "freelance", "loans"].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat as any)}
                className="capitalize"
              >
                {cat === "all" ? "All Packages" : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getCategoryColor(pkg.category)}>
                    {pkg.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{pkg.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Includes:</p>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Duration
                    </p>
                    <p className="font-semibold text-sm">{pkg.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Reviews
                    </p>
                    <p className="font-semibold text-sm">{pkg.reviews}</p>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  {pkg.price > 0 ? (
                    <div>
                      <p className="text-xs text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-muted-foreground">Get Quote</p>
                      <p className="text-lg font-semibold">Custom Rates</p>
                    </div>
                  )}
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary gap-2">
                    View <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No packages found matching your criteria</p>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
