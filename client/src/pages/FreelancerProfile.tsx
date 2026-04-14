import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactModal } from "@/components/ContactModal";
import { Star, MapPin, Clock, DollarSign, MessageSquare, Award, Briefcase, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

// Sample freelancer data
const freelancersData: Record<string, any> = {
  "freelancer-1": {
    id: "freelancer-1",
    name: "Alexandra Chen",
    subcategory: "writing-conversion",
    rating: 4.9,
    reviews: 247,
    price: 1500,
    description: "Conversion copywriter specializing in SaaS and e-commerce. 8+ years experience turning browsers into buyers.",
    portfolio: ["Stripe Case Study", "Shopify Landing Page", "HubSpot Email Campaign"],
    responseTime: "< 2 hours",
    completedProjects: 312,
    bio: "I'm a conversion copywriter who specializes in turning website visitors into paying customers. With 8+ years of experience in SaaS and e-commerce, I've helped over 300 companies increase their conversion rates by an average of 35%.",
    skills: ["Conversion Copywriting", "SaaS Marketing", "Landing Pages", "Email Marketing", "A/B Testing"],
    testimonials: [
      { author: "John Smith", company: "TechStartup Inc", text: "Alexandra completely transformed our landing page. Conversions increased by 42% within the first month.", rating: 5 },
      { author: "Sarah Johnson", company: "E-commerce Co", text: "Best copywriter we've worked with. Clear, compelling, and results-driven.", rating: 5 },
      { author: "Mike Chen", company: "SaaS Solutions", text: "Exceptional work. Alexandra understands our audience and knows how to speak to them.", rating: 4.8 }
    ],
    availability: "Available for new projects",
    hourlyRate: 150,
    minProjectSize: 1500
  },
  "freelancer-2": {
    id: "freelancer-2",
    name: "Marcus Rodriguez",
    subcategory: "webdesign-ux",
    rating: 4.8,
    reviews: 189,
    price: 2500,
    description: "UX designer focused on user research and intuitive flows. Worked with Fortune 500 companies.",
    portfolio: ["Figma Design System", "Mobile App Redesign", "E-commerce Platform"],
    responseTime: "< 4 hours",
    completedProjects: 156,
    bio: "I'm a UX designer with a passion for creating intuitive, beautiful digital experiences. I've worked with Fortune 500 companies and startups alike, always putting the user first.",
    skills: ["UX Design", "UI Design", "User Research", "Wireframing", "Prototyping", "Figma", "Design Systems"],
    testimonials: [
      { author: "Emily Davis", company: "Fortune 500 Tech", text: "Marcus's design system saved us months of development time. Highly recommended.", rating: 5 },
      { author: "Alex Turner", company: "Startup Hub", text: "Great designer who listens and delivers. Very professional.", rating: 4.9 }
    ],
    availability: "Available for new projects",
    hourlyRate: 200,
    minProjectSize: 2500
  },
  "freelancer-3": {
    id: "freelancer-3",
    name: "Priya Patel",
    subcategory: "video-cinematic",
    rating: 4.95,
    reviews: 203,
    price: 3000,
    description: "Cinematic video editor for brands and creators. Emmy-nominated for documentary work.",
    portfolio: ["Brand Documentary", "Product Launch Video", "Testimonial Series"],
    responseTime: "< 6 hours",
    completedProjects: 89,
    bio: "Emmy-nominated video editor specializing in cinematic storytelling. I create videos that move people and drive results.",
    skills: ["Video Editing", "Color Grading", "Motion Graphics", "Documentary", "Cinematography", "Sound Design"],
    testimonials: [
      { author: "Lisa Wong", company: "Brand Co", text: "Priya's work is absolutely stunning. She captured our brand story perfectly.", rating: 5 },
      { author: "David Park", company: "Production House", text: "Professional, creative, and delivers on time. A true artist.", rating: 5 }
    ],
    availability: "Selective availability - booking 2-3 months out",
    hourlyRate: 250,
    minProjectSize: 3000
  }
};

export default function FreelancerProfile() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/freelancer/:id");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  if (!match) {
    return null;
  }

  const freelancer = freelancersData[params?.id || ""];

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Freelancer Not Found</h1>
          <p className="text-muted-foreground mb-6">The freelancer profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/freelance")}>Back to Freelancers</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/freelance")}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Freelancers
          </Button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{freelancer.name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{freelancer.description}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{freelancer.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({freelancer.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-5 h-5" />
                  <span>{freelancer.completedProjects} projects completed</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>Response: {freelancer.responseTime}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">{freelancer.bio}</p>

              {/* Availability */}
              <Badge variant="outline" className="mb-6">
                {freelancer.availability}
              </Badge>
            </div>

            {/* Pricing Card */}
            <div className="md:w-80">
              <Card className="p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Starting Price</p>
                  <p className="text-4xl font-bold text-primary mb-2">${freelancer.price}</p>
                  <p className="text-sm text-muted-foreground">
                    Hourly rate: ${freelancer.hourlyRate}/hr
                  </p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Min Project Size:</span>
                    <span className="font-medium">${freelancer.minProjectSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed Projects:</span>
                    <span className="font-medium">{freelancer.completedProjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">{freelancer.responseTime}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary gap-2 mb-3"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Project
                </Button>

                <Button variant="outline" className="w-full">
                  Save Profile
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="py-12 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {freelancer.skills.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-base px-4 py-2">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-12 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freelancer.portfolio.map((item: string, idx: number) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item}</h3>
                <p className="text-sm text-muted-foreground">Featured project</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freelancer.testimonials.map((testimonial: any, idx: number) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(testimonial.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        freelancerName={freelancer.name}
        freelancerId={freelancer.id}
      />
    </div>
  );
}
