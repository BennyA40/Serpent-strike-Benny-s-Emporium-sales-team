import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

interface DestinationPageProps {
  destination: {
    name: string;
    country: string;
    heroImage: string;
    description: string;
    highlights: string[];
    bestTime: string;
    packages: Array<{
      id: number;
      name: string;
      description: string;
      price: string;
      duration: string;
      highlights: string[];
      image: string;
    }>;
  };
}

export default function DestinationTemplate({ destination }: DestinationPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/travel-planning">
            <a className="flex items-center gap-2 hover:text-secondary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold text-secondary">Travel Hub</span>
            </a>
          </Link>
          <h1 className="text-xl font-bold text-white">{destination.name}</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          backgroundImage: `url('${destination.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary/50"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-secondary font-semibold text-lg mb-2">{destination.country}</p>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {destination.description}
            </p>
            <Button className="btn-luxury bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-lg">
              Explore Packages
            </Button>
          </div>
        </div>
      </header>

      {/* Destination Highlights */}
      <section className="py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Visit {destination.name}?</h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Experience the magic of {destination.name} with our curated travel packages. From luxury accommodations to unforgettable experiences, we've designed every detail to ensure your journey is nothing short of extraordinary.
              </p>
            </div>
            <div className="space-y-4">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/80">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Time to Visit */}
          <div className="mt-12 p-8 bg-background border border-border rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-3">Best Time to Visit</h3>
            <p className="text-foreground/70 text-lg">{destination.bestTime}</p>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Curated Packages for {destination.name}
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="service-card-luxury overflow-hidden group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-foreground/70 mb-4">{pkg.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {pkg.duration}
                  </span>
                </div>

                <div className="mb-4 space-y-2">
                  {pkg.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-2xl font-bold text-secondary">{pkg.price}</span>
                  <Button className="btn-luxury bg-secondary hover:bg-secondary/90 text-primary font-bold py-2 px-4 rounded-full text-sm">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-5xl font-bold mb-6">Ready for Your {destination.name} Adventure?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let our travel specialists help you plan the perfect trip to {destination.name}. Get personalized recommendations and exclusive deals.
          </p>
          <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-lg">
            Request Custom Package
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/80 text-white py-8">
        <div className="container text-center">
          <p className="text-white/70 mb-4">
            © 2026 Benny's Emporium Travel & Lifestyle. All rights reserved.
          </p>
          <Link href="/travel-planning">
            <a className="text-secondary hover:text-secondary/80 transition-colors inline-block">
              ← Back to Travel Hub
            </a>
          </Link>
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
