import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { Star, Search, Filter, MapPin, Clock, DollarSign, MessageSquare, Award, Briefcase } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";

// Subcategory data
const subcategories = [
  // Writing
  { id: "writing-auctioneer", name: "Writer–Auctioneer", category: "Writing", icon: "🎤" },
  { id: "writing-ritual", name: "Ritual Copywriter", category: "Writing", icon: "✨" },
  { id: "writing-microstory", name: "Micro‑Story Artisan", category: "Writing", icon: "📖" },
  { id: "writing-conversion", name: "Conversion Bard", category: "Writing", icon: "🎯" },
  { id: "writing-persona", name: "Persona Architect", category: "Writing", icon: "🎭" },
  { id: "writing-technical", name: "Technical Summarist", category: "Writing", icon: "📋" },
  { id: "writing-ghostwriter", name: "Ghostwriter for Founders", category: "Writing", icon: "👻" },
  { id: "writing-emotional", name: "Emotional Logic Writer", category: "Writing", icon: "💭" },
  { id: "writing-worldbuilding", name: "Worldbuilding Scribe", category: "Writing", icon: "🌍" },
  { id: "writing-dialogue", name: "Dialogue Tailor", category: "Writing", icon: "💬" },
  { id: "writing-brand-scripture", name: "Brand Scripture Writer", category: "Writing", icon: "📜" },

  // Web Design
  { id: "webdesign-ux", name: "UX Ritualist", category: "Web Design", icon: "🎨" },
  { id: "webdesign-microinteraction", name: "Micro‑Interaction Designer", category: "Web Design", icon: "✨" },
  { id: "webdesign-conversion", name: "Conversion Layout Engineer", category: "Web Design", icon: "🎯" },
  { id: "webdesign-brand", name: "Brand‑First Web Stylist", category: "Web Design", icon: "🎭" },
  { id: "webdesign-nocode", name: "No‑Code / Webflow Specialist", category: "Web Design", icon: "⚡" },
  { id: "webdesign-accessibility", name: "Accessibility‑Focused Designer", category: "Web Design", icon: "♿" },

  // Video Editing
  { id: "video-cinematic", name: "Cinematic Story Cutter", category: "Video Editing", icon: "🎬" },
  { id: "video-social", name: "Social Pulse Editor", category: "Video Editing", icon: "📱" },
  { id: "video-motion", name: "Motion Graphics Alchemist", category: "Video Editing", icon: "🎨" },
  { id: "video-documentary", name: "Documentary Narrative Editor", category: "Video Editing", icon: "🎥" },
  { id: "video-musicsynced", name: "Music‑Synced Visual Cutter", category: "Video Editing", icon: "🎵" },
  { id: "video-colorgrading", name: "Color Grading Specialist", category: "Video Editing", icon: "🌈" },

  // Consulting
  { id: "consulting-systems", name: "Systems & Workflow Architect", category: "Consulting", icon: "⚙️" },
  { id: "consulting-brand", name: "Brand Identity Strategist", category: "Consulting", icon: "🎯" },
  { id: "consulting-business", name: "Business Clarity Consultant", category: "Consulting", icon: "🧭" },
  { id: "consulting-digital", name: "Digital Transformation Advisor", category: "Consulting", icon: "🚀" },
  { id: "consulting-market", name: "Market Positioning Analyst", category: "Consulting", icon: "📊" },

  // Programming
  { id: "programming-fullstack", name: "Full‑Stack Problem Solver", category: "Programming", icon: "💻" },
  { id: "programming-api", name: "API Integration Specialist", category: "Programming", icon: "🔗" },
  { id: "programming-nocode", name: "No‑Code / Low‑Code Engineer", category: "Programming", icon: "⚡" },
  { id: "programming-performance", name: "Performance & Optimization Developer", category: "Programming", icon: "⚡" },
  { id: "programming-security", name: "Security & Compliance Coder", category: "Programming", icon: "🔒" },

  // Marketing
  { id: "marketing-funnel", name: "Funnel & Conversion Strategist", category: "Marketing", icon: "🎯" },
  { id: "marketing-social", name: "Social Presence Architect", category: "Marketing", icon: "📱" },
  { id: "marketing-ads", name: "Paid Ads Technician", category: "Marketing", icon: "📢" },
  { id: "marketing-community", name: "Community Growth Engineer", category: "Marketing", icon: "👥" },
  { id: "marketing-analytics", name: "Analytics & Insights Specialist", category: "Marketing", icon: "📊" },

  // Music
  { id: "music-genre", name: "Genre‑Fusion Composer", category: "Music", icon: "🎵" },
  { id: "music-vocal", name: "Vocal Production Specialist", category: "Music", icon: "🎤" },
  { id: "music-beat", name: "Beat Architect", category: "Music", icon: "🎹" },
  { id: "music-mixing", name: "Mixing & Mastering Engineer", category: "Music", icon: "🎚️" },
  { id: "music-sound", name: "Sound Identity Designer", category: "Music", icon: "🔊" }
];

// Sample freelancers
const freelancers = [
  {
    id: "freelancer-1",
    name: "Alexandra Chen",
    subcategory: "writing-conversion",
    rating: 4.9,
    reviews: 247,
    price: 1500,
    description: "Conversion copywriter specializing in SaaS and e-commerce. 8+ years experience.",
    portfolio: ["Stripe Case Study", "Shopify Landing Page", "HubSpot Email Campaign"],
    responseTime: "< 2 hours",
    completedProjects: 312
  },
  {
    id: "freelancer-2",
    name: "Marcus Rodriguez",
    subcategory: "webdesign-ux",
    rating: 4.8,
    reviews: 189,
    price: 2500,
    description: "UX designer focused on user research and intuitive flows.",
    portfolio: ["Figma Design System", "Mobile App Redesign", "E-commerce Platform"],
    responseTime: "< 4 hours",
    completedProjects: 156
  },
  {
    id: "freelancer-3",
    name: "Priya Patel",
    subcategory: "video-cinematic",
    rating: 4.95,
    reviews: 203,
    price: 3000,
    description: "Cinematic video editor for brands and creators. Emmy-nominated.",
    portfolio: ["Brand Documentary", "Product Launch Video", "Testimonial Series"],
    responseTime: "< 6 hours",
    completedProjects: 89
  },
  {
    id: "freelancer-4",
    name: "James Wilson",
    subcategory: "programming-fullstack",
    rating: 4.85,
    reviews: 267,
    price: 3500,
    description: "Full-stack developer specializing in React and Node.js.",
    portfolio: ["SaaS Dashboard", "Real-time Chat App", "E-commerce Platform"],
    responseTime: "< 1 hour",
    completedProjects: 234
  },
  {
    id: "freelancer-5",
    name: "Sofia Bergström",
    subcategory: "consulting-brand",
    rating: 4.9,
    reviews: 156,
    price: 2000,
    description: "Brand strategist helping startups find their voice.",
    portfolio: ["Tech Startup Rebrand", "Luxury Brand Identity", "Non-profit Positioning"],
    responseTime: "< 8 hours",
    completedProjects: 127
  },
  {
    id: "freelancer-6",
    name: "David Kim",
    subcategory: "marketing-funnel",
    rating: 4.8,
    reviews: 198,
    price: 2200,
    description: "Growth marketer focused on conversion optimization.",
    portfolio: ["SaaS Growth Strategy", "E-commerce Funnel Audit", "Webinar Campaign"],
    responseTime: "< 3 hours",
    completedProjects: 189
  },
  {
    id: "freelancer-7",
    name: "Emma Thompson",
    subcategory: "writing-worldbuilding",
    rating: 4.92,
    reviews: 134,
    price: 2500,
    description: "Worldbuilding expert for games and fiction.",
    portfolio: ["Fantasy World Bible", "Game Narrative Design", "Transmedia Storytelling"],
    responseTime: "< 12 hours",
    completedProjects: 67
  },
  {
    id: "freelancer-8",
    name: "Raj Patel",
    subcategory: "music-mixing",
    rating: 4.87,
    reviews: 178,
    price: 1800,
    description: "Mixing and mastering engineer. Grammy-nominated.",
    portfolio: ["Indie Album Mastering", "Podcast Audio Design", "Commercial Jingle"],
    responseTime: "< 24 hours",
    completedProjects: 245
  }
];

export default function FreelanceHub() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<"browse" | "myServices" | "myProjects">("browse");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<{ id: string; name: string } | null>(null);

  const categories = Array.from(new Set(subcategories.map(s => s.category)));

  const filteredSubcategories = selectedCategory
    ? subcategories.filter(s => s.category === selectedCategory)
    : subcategories;

  const filteredFreelancers = freelancers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubcategory = !selectedSubcategory || f.subcategory === selectedSubcategory;
    return matchesSearch && matchesSubcategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">Freelance Solutions</h1>
          <p className="text-xl text-muted-foreground">Get your projects done by experts.</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 bg-background border-b border-border z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-4 flex-wrap">
            <Button
              variant={viewMode === "browse" ? "default" : "outline"}
              onClick={() => setViewMode("browse")}
              className="px-6"
            >
              Browse Freelancers
            </Button>
            {user && (
              <>
                <Button
                  variant={viewMode === "myServices" ? "default" : "outline"}
                  onClick={() => setViewMode("myServices")}
                  className="px-6"
                >
                  My Services
                </Button>
                <Button
                  variant={viewMode === "myProjects" ? "default" : "outline"}
                  onClick={() => setViewMode("myProjects")}
                  className="px-6"
                >
                  My Projects
                </Button>
              </>
            )}
            <Button
              onClick={() => navigate("/packages")}
              variant="outline"
              className="px-6 ml-auto"
            >
              Browse Packages
            </Button>
          </div>
        </div>
      </nav>

      {/* Browse Mode */}
      {viewMode === "browse" && (
        <section className="py-12 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Search */}
            <div className="mb-8">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search freelancers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Categories</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!selectedCategory ? "default" : "outline"}
                    onClick={() => { setSelectedCategory(undefined); setSelectedSubcategory(undefined); }}
                    size="sm"
                  >
                    All Categories
                  </Button>
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      onClick={() => { setSelectedCategory(cat); setSelectedSubcategory(undefined); }}
                      size="sm"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              {selectedCategory && (
                <div>
                  <p className="text-sm font-medium mb-3">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedSubcategory ? "default" : "outline"}
                      onClick={() => setSelectedSubcategory(undefined)}
                      size="sm"
                    >
                      All {selectedCategory}
                    </Button>
                    {filteredSubcategories.map(sub => (
                      <Button
                        key={sub.id}
                        variant={selectedSubcategory === sub.id ? "default" : "outline"}
                        onClick={() => setSelectedSubcategory(sub.id)}
                        size="sm"
                        className="gap-1"
                      >
                        <span>{sub.icon}</span>
                        {sub.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredFreelancers.length} freelancer{filteredFreelancers.length !== 1 ? 's' : ''}
                {selectedSubcategory && ` in ${subcategories.find(s => s.id === selectedSubcategory)?.name}`}
              </p>
            </div>

            {/* Freelancers Grid */}
            {filteredFreelancers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map(freelancer => (
                  <Card key={freelancer.id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{freelancer.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{freelancer.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{freelancer.description}</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 bg-background rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Reviews</p>
                          <p className="font-bold">{freelancer.reviews}</p>
                        </div>
                        <div className="text-center p-2 bg-background rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Projects</p>
                          <p className="font-bold">{freelancer.completedProjects}</p>
                        </div>
                        <div className="text-center p-2 bg-background rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Response</p>
                          <p className="font-bold text-xs">{freelancer.responseTime}</p>
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <p className="text-sm font-medium mb-2">Portfolio</p>
                        <ul className="space-y-1">
                          {freelancer.portfolio.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 bg-primary rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting at</p>
                        <p className="text-2xl font-bold text-primary">${freelancer.price}</p>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedFreelancer({ id: freelancer.id, name: freelancer.name });
                          setContactModalOpen(true);
                        }}
                        className="bg-secondary hover:bg-secondary/90 text-primary gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Hire
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No freelancers found matching your criteria</p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory(undefined); setSelectedSubcategory(undefined); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* My Services / My Projects - Placeholder */}
      {viewMode === "myServices" && (
        <section className="py-16 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">My Services section coming soon</p>
            </div>
          </div>
        </section>
      )}

      {viewMode === "myProjects" && (
        <section className="py-16 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">My Projects section coming soon</p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Modal */}
      {selectedFreelancer && (
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => {
            setContactModalOpen(false);
            setSelectedFreelancer(null);
          }}
          freelancerName={selectedFreelancer.name}
          freelancerId={selectedFreelancer.id}
        />
      )}
    </div>
  );
}
