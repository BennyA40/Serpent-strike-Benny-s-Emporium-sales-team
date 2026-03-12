import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Plane, Code, DollarSign, Zap } from "lucide-react";
import { useState } from "react";

/* Design System: Modern Luxury Marketplace
   - Hero: Deep charcoal with copper-gold accents, asymmetric layout
   - Services: Card-based grid with lift effects on hover
   - About: Dark section with warm typography
   - Contact: Clear CTA with multiple engagement paths
   - Interactions: Smooth transitions, staggered animations
*/

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Plane,
      title: "Travel & Lifestyle Hub",
      description: "Flights, hotels, car rentals, cruises, wellness retreats, adventure activities, fine dining, sports tickets, concert tickets, and unforgettable experiences — all integrated in one place.",
      color: "from-amber-400 to-orange-400"
    },
    {
      id: 2,
      icon: Code,
      title: "Freelance Solutions",
      description: "Connect with top talent or find gigs — web design, writing, consulting, creative work, and beyond.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 3,
      icon: DollarSign,
      title: "Loan Brokering",
      description: "Competitive rates, personalized options — we broker loans for personal, business, travel, or investment needs.",
      color: "from-emerald-400 to-teal-400"
    },
    {
      id: 4,
      icon: Zap,
      title: "And Much More...",
      description: "Consulting, partnerships, custom projects — if it's ambitious and exciting, Benny's Emporium has you covered.",
      color: "from-purple-400 to-indigo-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-secondary">Benny's Emporium</h1>
          <ul className="hidden md:flex gap-8">
            <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-secondary transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-secondary transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-secondary transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hero-background-ARQSEKJVpkFyGn3iesDoqe.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Gateway to Endless Opportunities
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Travel adventures, leisure escapes, freelance expertise, loan brokering, and so much more — all under one trusted roof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="btn-luxury bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-lg"
              >
                <a href="#services">Explore Our World</a>
              </Button>
              <Button
                asChild
                className="btn-luxury bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg border border-white/40"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              What We Offer
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="service-card-luxury group cursor-pointer"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                  {activeService === service.id && (
                    <div className="mt-4 pt-4 border-t border-secondary/20">
                      <a href={service.id === 1 ? "/travel-planning" : service.id === 2 ? "/freelance" : service.id === 3 ? "/loans" : "#contact"} className="text-secondary font-semibold hover:text-secondary/80 transition-colors inline-flex items-center gap-2">
                        Learn More →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              About Benny's Emporium
            </h2>
            <p className="text-lg leading-relaxed text-white/90 mb-8">
              Founded with a passion for opportunity and adventure, Benny's Emporium is more than a business — it's a gateway to the experiences, services, and financial solutions you've been searching for. Whether you're planning your next getaway, seeking freelance freedom, or exploring smart financing, we're here to make it happen with expertise, integrity, and a personal touch.
            </p>
            <div className="inline-block px-8 py-1 bg-secondary/20 rounded-full border border-secondary/40">
              <p className="text-secondary font-semibold">Trusted by thousands • Est. 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              Let's Connect
            </h2>
            <div className="section-divider"></div>

            <p className="text-center text-lg text-foreground/70 mb-12">
              Ready to turn ideas into reality? Drop us a line — we're excited to hear from you!
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Button
                asChild
                className="btn-luxury bg-secondary hover:bg-secondary/90 text-primary font-bold py-4 px-8 rounded-full text-lg h-auto"
              >
                <a href="mailto:benny@bennysemporium.com" className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </Button>
              <Button
                asChild
                className="btn-luxury bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-lg h-auto"
              >
                <a href="tel:+15551234567" className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-foreground/70">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span>benny@bennysemporium.com</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-border"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span>Allentown, PA</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-border"></div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container text-center">
          <p className="text-white/70">
            © 2026 Benny's Emporium. All rights reserved. | Built with passion for endless possibilities.
          </p>
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
