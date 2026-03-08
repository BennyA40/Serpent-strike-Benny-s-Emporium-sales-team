import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Plane, Hotel, Ship, Calendar, Users, DollarSign, CheckCircle2, Ticket, Utensils, Dumbbell, Music, Car, Heart } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import SearchFilter from "@/components/SearchFilter";

/* Design System: Modern Luxury Marketplace
   - Travel & Lifestyle Hub - Comprehensive Platform
   - Flights, Hotels, Car Rentals, Cruises
   - Wellness Retreats, Adventure Activities, Cultural Tours
   - Fine Dining, Entertainment, Sports Tickets, Concert Tickets
   - All integrated throughout package offerings
*/

export default function TravelPlanning() {
  const [activeTab, setActiveTab] = useState<'all' | 'flights' | 'hotels' | 'cruises' | 'experiences'>('all');

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "London, UK",
      rating: 5,
      quote: "The Paris package was absolutely magical. Every detail was perfectly planned.",
      experience: "Parisian Romance Package - 5 days"
    },
    {
      id: 2,
      name: "James Chen",
      location: "Singapore",
      rating: 5,
      quote: "Our Bali wellness retreat transformed our lives. Highly recommend!",
      experience: "Wellness Retreat Paradise - 7 days"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      quote: "The Caribbean yacht experience was the trip of a lifetime.",
      experience: "Luxury Yacht Experience - 7 days"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Toronto, Canada",
      rating: 5,
      quote: "Tokyo culinary journey exceeded all expectations. Incredible dining experiences.",
      experience: "Culinary Journey - 7 days"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      location: "Sydney, Australia",
      rating: 5,
      quote: "Dubai luxury experience was world-class. Everything was seamless.",
      experience: "Luxury Dubai Experience - 5 days"
    }
  ];

  const handleFilter = (criteria: any) => {
    // Filter logic can be expanded here
    console.log("Filters applied:", criteria);
  };

  const comprehensivePackages = [
    {
      id: 1,
      name: "European River Cruise & Wellness Retreat",
      description: "Luxury river cruise through Europe's scenic waterways with integrated spa and wellness activities",
      price: "From $2,499",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/river-cruise_10b3e896.jpg",
      duration: "7-10 days",
      category: "cruises",
      highlights: ["All-inclusive meals", "Expert guides", "Shore excursions", "Spa & wellness", "Cultural tours"]
    },
    {
      id: 2,
      name: "Luxury Resort Escape with Entertainment",
      description: "5-star resort experiences in paradise with concert tickets, fine dining, and adventure activities",
      price: "From $1,899",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg",
      duration: "5-7 days",
      category: "hotels",
      highlights: ["Premium accommodations", "Concert & entertainment", "Fine dining", "Spa & wellness", "Adventure activities"]
    },
    {
      id: 3,
      name: "Global Flight Network with Ground Services",
      description: "Access to flights worldwide with car rentals, hotel bookings, and local experience packages",
      price: "Competitive rates",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/airport-modern_c09a6d9b.jpg",
      duration: "Flexible",
      category: "flights",
      highlights: ["Best prices", "Flexible dates", "24/7 support", "Car rentals included", "Hotel partnerships"]
    },
    {
      id: 4,
      name: "Sports & Concert Experience Package",
      description: "Premium tickets to major sporting events and concerts worldwide with VIP accommodations",
      price: "From $1,299",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp",
      duration: "3-5 days",
      category: "experiences",
      highlights: ["VIP event tickets", "Premium seating", "Hotel near venue", "Ground transportation", "Meet & greet options"]
    },
    {
      id: 5,
      name: "Adventure & Cultural Immersion",
      description: "Active adventures, cultural tours, and local experiences with professional guides and accommodations",
      price: "From $1,599",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/travel-service-visual-FzssFG3yvmGZbhhYniXQD3.webp",
      duration: "6-8 days",
      category: "experiences",
      highlights: ["Guided adventures", "Cultural immersion", "Local cuisine", "Professional guides", "Small group tours"]
    },
    {
      id: 6,
      name: "Culinary & Fine Dining Tour",
      description: "Michelin-starred restaurants, cooking classes, wine tastings, and gourmet experiences worldwide",
      price: "From $2,199",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp",
      duration: "5-7 days",
      category: "experiences",
      highlights: ["Michelin-starred dining", "Cooking classes", "Wine tastings", "Chef-led experiences", "Luxury accommodations"]
    }
  ];

  const services = [
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
      icon: Car,
      title: "Car Rentals",
      description: "Rent vehicles at competitive rates with flexible terms and worldwide coverage."
    },
    {
      icon: Ship,
      title: "Cruise Packages",
      description: "Explore all-inclusive cruise experiences with expert itineraries and premium accommodations."
    },
    {
      icon: Dumbbell,
      title: "Wellness & Adventure",
      description: "Wellness retreats, spa experiences, and adventure activities from hiking to water sports."
    },
    {
      icon: Heart,
      title: "Cultural & Local Experiences",
      description: "Immerse yourself in local cultures, guided tours, and authentic community experiences."
    },
    {
      icon: Utensils,
      title: "Fine Dining & Culinary",
      description: "Michelin-starred restaurants, cooking classes, wine tastings, and gourmet experiences."
    },
    {
      icon: Music,
      title: "Entertainment & Events",
      description: "Concert tickets, sports events, theater shows, and VIP experiences with premium seating."
    },
    {
      icon: Ticket,
      title: "Sports & Concert Tickets",
      description: "Premium access to major sporting events and concerts worldwide with VIP packages."
    },
    {
      icon: Calendar,
      title: "Custom Itineraries",
      description: "Personalized travel planning tailored to your preferences, budget, and lifestyle."
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
      description: "Tell us your travel dreams, preferences, and what experiences matter most to you."
    },
    {
      number: 2,
      title: "Get Expert Guidance",
      description: "Receive personalized recommendations from our experienced travel and lifestyle specialists."
    },
    {
      number: 3,
      title: "Book Everything",
      description: "We handle flights, hotels, car rentals, activities, tickets, dining — everything in one place."
    },
    {
      number: 4,
      title: "Travel & Enjoy",
      description: "Embark on your adventure with 24/7 support and peace of mind throughout your journey."
    }
  ];

  const filteredPackages = activeTab === 'all' 
    ? comprehensivePackages 
    : comprehensivePackages.filter(pkg => pkg.category === activeTab);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold text-secondary">Benny's Emporium</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Travel & Lifestyle</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-gradient-to-b from-primary to-primary/80">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Complete Travel & Lifestyle Hub
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Flights, hotels, car rentals, cruises, wellness retreats, adventure activities, fine dining, sports tickets, concert tickets, and unforgettable experiences — all curated and integrated through IntelliTravel's partner network.
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

      {/* Search & Filter Section */}
      <section className="py-12 bg-background">
        <div className="container">
          <SearchFilter onFilter={handleFilter} />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { value: 'all', label: 'All Packages' },
              { value: 'flights', label: 'Flights' },
              { value: 'hotels', label: 'Hotels' },
              { value: 'cruises', label: 'Cruises' },
              { value: 'experiences', label: 'Experiences' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.value
                    ? 'bg-secondary text-primary'
                    : 'bg-background text-foreground border border-border hover:border-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Featured Packages & Experiences
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPackages.map((pkg, index) => (
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

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            What Our Travelers Say
          </h2>
          <div className="section-divider"></div>
          <div className="max-w-3xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Comprehensive Services Grid */}
      <section className="py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Everything You Need for the Perfect Journey
          </h2>
          <div className="section-divider"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
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
                  <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{service.description}</p>
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
            Once our IntelliTravel portal and travel GMX email are active, you'll be able to request quotes, get guidance, and book commission-eligible trips with ease. From flights and hotels to wellness retreats, concert tickets, and culinary experiences — we handle it all.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Quick Quote</h3>
              <p className="text-white/80 mb-6">Get instant pricing for your travel and lifestyle plans</p>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 rounded-full">
                Request Quote
              </Button>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Expert Consultation</h3>
              <p className="text-white/80 mb-6">Speak with our travel and lifestyle specialists</p>
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
            © 2026 Benny's Emporium Travel & Lifestyle. All rights reserved.
          </p>
          <Link href="/" className="text-secondary hover:text-secondary/80 transition-colors mt-4 inline-block">
            ← Back to Home
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
