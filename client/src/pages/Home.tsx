import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Plane, Briefcase, DollarSign, ArrowRight, Star, Zap, Shield, Users, TrendingUp, Globe } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { user, loading, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-border">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Endless Opportunities</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Travel adventures, freelance expertise, loan brokering, and so much more — all under one trusted roof. Benny's Emporium is your sovereign capital hub for everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/travel-planning")}
                size="lg"
                className="gap-2"
              >
                Explore Our World
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/freelance")}
              >
                Browse Expertise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Emporium Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three distinct ecosystems, seamlessly integrated. From wanderlust to expertise to capital, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Travel Pillar */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-32 bg-gradient-to-br from-red-400 to-orange-400 relative overflow-hidden">
                <Plane className="absolute bottom-0 right-0 w-24 h-24 opacity-20 transform translate-x-4 translate-y-4" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Travel Solutions</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Flights, hotels, cruises, resorts, and unforgettable experiences. Your complete travel companion.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Instant booking & quotes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Curated destinations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Expert recommendations</span>
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/travel-planning")}
                  variant="outline"
                  className="w-full gap-2 group-hover:bg-red-50 dark:group-hover:bg-red-900/20"
                >
                  Explore Travel
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Freelance Pillar */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group border-2 border-primary">
              <div className="h-32 bg-gradient-to-br from-blue-400 to-cyan-400 relative overflow-hidden">
                <Briefcase className="absolute bottom-0 right-0 w-24 h-24 opacity-20 transform translate-x-4 translate-y-4" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Freelance Solutions</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  7 categories, 50+ specialized roles. Find world-class talent for any project.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Writing & copywriting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Design & development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Video, music & consulting</span>
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/freelance")}
                  className="w-full gap-2"
                >
                  Browse Freelancers
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Loans Pillar */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-400 relative overflow-hidden">
                <DollarSign className="absolute bottom-0 right-0 w-24 h-24 opacity-20 transform translate-x-4 translate-y-4" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Loan Brokering</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Fast funding, competitive rates, personalized options. Capital when you need it.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Quick qualification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Multiple lender options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Transparent terms</span>
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/loans")}
                  variant="outline"
                  className="w-full gap-2 group-hover:bg-green-50 dark:group-hover:bg-green-900/20"
                >
                  Get Funded
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Benny's */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Benny's Emporium?</h2>
            <p className="text-lg text-muted-foreground">
              We're not just a marketplace — we're your trusted partner in opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Vetted Experts", desc: "All professionals verified and rated" },
              { icon: TrendingUp, title: "Real Results", desc: "Proven track records and testimonials" },
              { icon: Globe, title: "Global Reach", desc: "Access talent and opportunities worldwide" },
              { icon: Users, title: "Community", desc: "Join thousands of satisfied users" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Packages</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Curated offerings across all three pillars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Bali Escape", price: "$2,499", rating: 4.9, reviews: 342 },
              { title: "Website Redesign", price: "$5,000", rating: 4.8, reviews: 189 },
              { title: "Business Loan", price: "From $10K", rating: 4.7, reviews: 256 }
            ].map((pkg, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({pkg.reviews})</span>
                </div>
                <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                <Button className="w-full">Learn More</Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/packages")}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              Browse All Packages
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're seeking adventure, expertise, or capital, Benny's Emporium has the solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/travel-planning")}
              size="lg"
              className="gap-2"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/freelancer/signup")}
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
