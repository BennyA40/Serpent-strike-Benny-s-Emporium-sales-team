import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Plane, Hotel, Ship, Calendar, Users, DollarSign, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/* Design System: Modern Luxury Marketplace
   - Travel Planning Detail Page
   - Rich imagery showcasing destinations, accommodations, and experiences
   - Booking integration with IntelliTravel portal
   - Service highlights and testimonials
*/

export default function TravelPlanning() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cruises'>('flights');

  const travelPackages = [
    {
      id: 1,
      name: "European River Cruise",
      description: "Luxury river cruise through Europe's most scenic waterways",
      price: "From $2,499",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/river-cruise_10b3e896.jpg",
      duration: "7-10 days",
      highlights: ["All-inclusive meals", "Expert guides", "Shore excursions"]
    },
    {
      id: 2,
      name: "Luxury Resort Escape",
      description: "5-star resort experiences in paradise destinations",
      price: "From $1,899",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg",
      duration: "5-7 days",
      highlights: ["Premium accommodations", "Spa & wellness", "Fine dining"]
    },
    {
      id: 3,
      name: "Global Flight Network",
      description: "Access to flights worldwide through trusted partners",
      price: "Competitive rates",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/airport-modern_c09a6d9b.jpg",
      duration: "Flexible",
      highlights: ["Best prices", "Flexible dates", "24/7 support"]
    }
  ];

  const features = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Book flights to any destination worldwide through our trusted vendor network including Expedia and Priceline."
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Access thousands of hotels from budget-friendly to luxury 5-star properties across the globe."
    },
    {
      icon: Ship,
      title: "Cruise Packages",
      description: "Explore all-inclusive cruise experiences with expert itineraries and premium accommodations."
    },
    {
      icon: Calendar,
      title: "Custom Itineraries",
      description: "Personalized travel planning tailored to your preferences, budget, and travel style."
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Organize group trips with special rates and dedicated support for families and corporate events."
    },
    {
      icon: DollarSign,
      title: "Best Price Guarantee",
      description: "Competitive rates with commission-eligible bookings and exclusive partner discounts."
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Share Your Vision",
      description: "Tell us your travel dreams, budget, and preferences. Our team listens and understands your needs."
    },
    {
      number: 2,
      title: "Get Expert Guidance",
      description: "Receive personalized recommendations from our experienced travel consultants."
    },
    {
      number: 3,
      title: "Book with Confidence",
      description: "We handle all the details—flights, hotels, activities, and more through trusted vendors."
    },
    {
      number: 4,
      title: "Travel & Enjoy",
      description: "Embark on your adventure with 24/7 support and peace of mind throughout your journey."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <a className="flex items-center gap-2 hover:text-secondary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold text-secondary">Benny's Emporium</span>
            </a>
          </Link>
          <h1 className="text-xl font-bold text-white">Travel Planning</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-gradient-to-b from-primary to-primary/80">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Plan Your Perfect Getaway
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Expert travel planning with personalized support through IntelliTravel's partner network. Book flights, hotels, cruises, and all-inclusive packages with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="btn-luxury bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-lg"
            >
              Request a Quote
            </Button>
            <Button
              className="btn-luxury bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg border border-white/40"
            >
              Browse Packages
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Featured Travel Packages
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {travelPackages.map((pkg, index) => (
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
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Why Choose IntelliTravel?
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-background rounded-lg border border-border hover:border-secondary/50 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            How It Works
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-secondary to-secondary/30"></div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-orange-400 shadow-lg">
                    <span className="text-4xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-primary mb-3">{step.title}</h3>
                  <p className="text-center text-foreground/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-center text-lg text-white/90 mb-12">
            Once our IntelliTravel portal and travel GMX email are active, you'll be able to request quotes, get guidance, and book commission-eligible trips with ease.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Quick Quote</h3>
              <p className="text-white/80 mb-6">Get instant pricing for your travel plans</p>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-full">
                Request Quote
              </Button>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Expert Consultation</h3>
              <p className="text-white/80 mb-6">Speak with our travel specialists</p>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-full">
                Schedule Call
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/70 mb-4">Or reach out directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:travel@bennysemporium.com" className="text-secondary hover:text-secondary/80 font-semibold">
                travel@bennysemporium.com
              </a>
              <span className="hidden sm:block text-white/40">|</span>
              <a href="tel:+15551234567" className="text-secondary hover:text-secondary/80 font-semibold">
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/80 text-white py-8">
        <div className="container text-center">
          <p className="text-white/70">
            © 2026 Benny's Emporium Travel Planning. All rights reserved.
          </p>
          <Link href="/">
            <a className="text-secondary hover:text-secondary/80 transition-colors mt-4 inline-block">
              ← Back to Home
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
