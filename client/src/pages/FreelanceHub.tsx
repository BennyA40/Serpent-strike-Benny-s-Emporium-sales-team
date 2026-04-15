import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { Star, Search, Filter, ArrowRight, Zap, BookOpen, Video, Brain, Code, TrendingUp, Music, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";

// Complete Emporium Freelance Architecture
const categories = [
  {
    id: "writing",
    name: "Writing",
    icon: BookOpen,
    color: "from-amber-400 to-orange-400",
    description: "Copywriting, storytelling, brand narratives, and content creation",
    subcategories: [
      { id: "writer-auctioneer", name: "Writer–Auctioneer", desc: "High-energy auction scripts and collectible descriptions" },
      { id: "ritual-copywriter", name: "Ritual Copywriter", desc: "Ceremonial language and sacred-tone messaging" },
      { id: "micro-story", name: "Micro–Story Artisan", desc: "50–300 word narrative bursts and micro-fiction" },
      { id: "conversion-bard", name: "Conversion Bard", desc: "Emotionally charged sales copy and brand narratives" },
      { id: "persona-architect", name: "Persona Architect", desc: "Character voices and brand identity frameworks" },
      { id: "technical-summarist", name: "Technical Summarist", desc: "Complex document condensing and clarity" },
      { id: "ghostwriter-founders", name: "Ghostwriter for Founders", desc: "Speeches, manifestos, and thought-leadership" },
      { id: "emotional-logic", name: "Emotional Logic Writer", desc: "Reflective writing and emotional clarity" },
      { id: "worldbuilding", name: "Worldbuilding Scribe", desc: "Lore ecosystems and narrative structures" },
      { id: "dialogue-tailor", name: "Dialogue Tailor", desc: "Character-specific dialogue and voice-accurate lines" },
      { id: "brand-scripture", name: "Brand Scripture Writer", desc: "Brand commandments and cultural codes" }
    ]
  },
  {
    id: "webdesign",
    name: "Web Design",
    icon: Zap,
    color: "from-blue-400 to-cyan-400",
    description: "UX/UI design, web styling, and digital experiences",
    subcategories: [
      { id: "ux-ritualist", name: "UX Ritualist", desc: "Intentional user journeys and emotionally guided interactions" },
      { id: "micro-interaction", name: "Micro–Interaction Designer", desc: "Premium tactile details and animations" },
      { id: "conversion-layout", name: "Conversion Layout Engineer", desc: "Landing pages and checkout flow optimization" },
      { id: "brand-stylist", name: "Brand–First Web Stylist", desc: "Typography, color systems, and visual identity" },
      { id: "nocode-webflow", name: "No–Code / Webflow Specialist", desc: "Modern responsive sites using no-code tools" },
      { id: "accessibility", name: "Accessibility–Focused Designer", desc: "ADA-compliant and inclusive design" },
      { id: "responsive-tech", name: "Responsive Layout Technician", desc: "Multi-device optimization and performance" },
      { id: "design-system", name: "Design System Builder", desc: "Reusable UI kits and component libraries" }
    ]
  },
  {
    id: "videoediting",
    name: "Video Editing",
    icon: Video,
    color: "from-pink-400 to-rose-400",
    description: "Video production, editing, and motion graphics",
    subcategories: [
      { id: "cinematic-cutter", name: "Cinematic Story Cutter", desc: "Emotional film-style sequences with color grading" },
      { id: "social-pulse", name: "Social Pulse Editor", desc: "TikTok, Reels, Shorts and viral-style content" },
      { id: "motion-graphics", name: "Motion Graphics Alchemist", desc: "Animation, typography, and visual effects" },
      { id: "documentary", name: "Documentary Narrative Editor", desc: "Interviews and long-form storytelling" },
      { id: "music-synced", name: "Music–Synced Visual Cutter", desc: "Footage cut to rhythm and beat" },
      { id: "color-grading", name: "Color Grading Specialist", desc: "Tone, mood, and cinematic color science" },
      { id: "commercial-spot", name: "Commercial Spot Editor", desc: "Ads, promos, and branded content" },
      { id: "longform", name: "Long–Form Content Editor", desc: "Podcasts, webinars, and extended content" }
    ]
  },
  {
    id: "consulting",
    name: "Consulting",
    icon: Brain,
    color: "from-purple-400 to-indigo-400",
    description: "Business strategy, operations, and growth consulting",
    subcategories: [
      { id: "systems-architect", name: "Systems & Workflow Architect", desc: "Operational systems and process maps" },
      { id: "brand-strategist", name: "Brand Identity Strategist", desc: "Voice, values, and market positioning" },
      { id: "business-clarity", name: "Business Clarity Consultant", desc: "Goal refinement and strategic direction" },
      { id: "digital-transform", name: "Digital Transformation Advisor", desc: "Modern tools and AI-driven workflows" },
      { id: "market-analyst", name: "Market Positioning Analyst", desc: "Competitive analysis and trend research" },
      { id: "efficiency-consultant", name: "Operational Efficiency Consultant", desc: "Bottleneck identification and optimization" },
      { id: "ux-consultant", name: "Customer Experience Designer", desc: "Client journeys and service flow" }
    ]
  },
  {
    id: "programming",
    name: "Programming",
    icon: Code,
    color: "from-green-400 to-emerald-400",
    description: "Software development and technical solutions",
    subcategories: [
      { id: "fullstack", name: "Full–Stack Problem Solver", desc: "Front-end and back-end development" },
      { id: "api-specialist", name: "API Integration Specialist", desc: "System connections and data automation" },
      { id: "nocode-engineer", name: "No–Code / Low–Code Engineer", desc: "Bubble, Airtable, and platform tools" },
      { id: "performance-dev", name: "Performance & Optimization Developer", desc: "Speed, stability, and efficiency" },
      { id: "security-coder", name: "Security & Compliance Coder", desc: "Secure coding and data protection" },
      { id: "frontend-dev", name: "Frontend Interaction Developer", desc: "Dynamic UI and responsive interfaces" },
      { id: "backend-engineer", name: "Backend Logic Engineer", desc: "Server logic and scalable infrastructure" }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    color: "from-red-400 to-pink-400",
    description: "Growth strategy, campaigns, and audience building",
    subcategories: [
      { id: "funnel-strategist", name: "Funnel & Conversion Strategist", desc: "Customer journeys and conversion optimization" },
      { id: "social-architect", name: "Social Presence Architect", desc: "Brand identity and platform strategy" },
      { id: "ads-tech", name: "Paid Ads Technician", desc: "Meta, Google, TikTok campaigns" },
      { id: "community-growth", name: "Community Growth Engineer", desc: "Online communities and engagement" },
      { id: "analytics-specialist", name: "Analytics & Insights Specialist", desc: "Data interpretation and KPI tracking" },
      { id: "content-architect", name: "Content Calendar Architect", desc: "Long-term content planning" },
      { id: "brand-awareness", name: "Brand Awareness Strategist", desc: "Visibility and cultural footprint" }
    ]
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    color: "from-yellow-400 to-orange-400",
    description: "Music production, composition, and audio engineering",
    subcategories: [
      { id: "genre-fusion", name: "Genre–Fusion Composer", desc: "Hybrid musical styles and sonic identities" },
      { id: "vocal-production", name: "Vocal Production Specialist", desc: "Vocal tuning and enhancement" },
      { id: "beat-architect", name: "Beat Architect", desc: "Custom instrumentals and production" },
      { id: "mixing-mastering", name: "Mixing & Mastering Engineer", desc: "Track refinement and professional release" },
      { id: "sound-identity", name: "Sound Identity Designer", desc: "Sonic logos and brand soundscapes" },
      { id: "score-composer", name: "Score & Atmosphere Composer", desc: "Cinematic scores and ambient textures" },
      { id: "session-musician", name: "Session Musician (Remote)", desc: "Professional instrumental performances" }
    ]
  }
];

// Sample freelancers
const freelancers = [
  {
    id: "freelancer-1",
    name: "Alexandra Chen",
    category: "writing",
    subcategory: "conversion-bard",
    rating: 4.9,
    reviews: 247,
    price: 1500,
    description: "Conversion copywriter specializing in SaaS and e-commerce.",
    responseTime: "< 2 hours",
    completedProjects: 312,
  },
  {
    id: "freelancer-2",
    name: "Marcus Rodriguez",
    category: "webdesign",
    subcategory: "ux-ritualist",
    rating: 4.8,
    reviews: 189,
    price: 2500,
    description: "UX designer focused on user research and intuitive flows.",
    responseTime: "< 4 hours",
    completedProjects: 156,
  },
  {
    id: "freelancer-3",
    name: "Priya Patel",
    category: "videoediting",
    subcategory: "cinematic-cutter",
    rating: 4.95,
    reviews: 203,
    price: 3000,
    description: "Cinematic video editor for brands and creators.",
    responseTime: "< 6 hours",
    completedProjects: 89,
  }
];

export default function FreelanceHub() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<{ id: string; name: string } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | undefined>();

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const filteredFreelancers = freelancers.filter(f => {
    const matchesCategory = !selectedCategory || f.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || f.subcategory === selectedSubcategory;
    const matchesSearch = !searchTerm || 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Freelance Solutions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Access world-class talent across 7 specialized categories. From writing to music production, find the perfect expert for your project.
          </p>
          
          {/* Search */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search freelancers or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-12 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === category.id ? undefined : category.id);
                    setSelectedSubcategory(undefined);
                    setExpandedCategory(selectedCategory === category.id ? undefined : category.id);
                  }}
                  className="h-auto py-4 flex flex-col items-start gap-2"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.subcategories.length} roles</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subcategory Selection */}
      {selectedCategory && currentCategory && (
        <section className="py-12 border-b border-border bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Specializations in {currentCategory.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentCategory.subcategories.map(sub => (
                <Button
                  key={sub.id}
                  variant={selectedSubcategory === sub.id ? "default" : "outline"}
                  onClick={() => setSelectedSubcategory(selectedSubcategory === sub.id ? undefined : sub.id)}
                  className="h-auto py-3 flex flex-col items-start gap-1 text-left"
                >
                  <span className="font-semibold text-sm">{sub.name}</span>
                  <span className="text-xs text-muted-foreground">{sub.desc}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Freelancers Grid */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {selectedSubcategory 
              ? `${currentCategory?.subcategories.find(s => s.id === selectedSubcategory)?.name} Specialists`
              : selectedCategory
              ? `${currentCategory?.name} Experts`
              : "Featured Freelancers"}
          </h2>

          {filteredFreelancers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map(freelancer => (
                <Card key={freelancer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-bold mb-1">{freelancer.name}</h3>
                      <p className="text-sm text-muted-foreground">{freelancer.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{freelancer.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({freelancer.reviews} reviews)</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-background rounded border border-border">
                        <p className="text-xs text-muted-foreground">Projects</p>
                        <p className="font-bold">{freelancer.completedProjects}</p>
                      </div>
                      <div className="p-2 bg-background rounded border border-border">
                        <p className="text-xs text-muted-foreground">Response</p>
                        <p className="font-bold text-xs">{freelancer.responseTime}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Starting at</p>
                      <p className="text-2xl font-bold text-primary mb-4">${freelancer.price}</p>
                      
                      <Button
                        onClick={() => {
                          setSelectedFreelancer({ id: freelancer.id, name: freelancer.name });
                          setContactModalOpen(true);
                        }}
                        className="w-full bg-secondary hover:bg-secondary/90 text-primary gap-2"
                      >
                        Hire Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a Freelancer?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Benny's Emporium and start earning. Build your profile, showcase your expertise, and connect with clients worldwide.
          </p>
          <Button
            onClick={() => navigate("/freelancer/signup")}
            size="lg"
            className="gap-2"
          >
            Start Your Profile
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

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
