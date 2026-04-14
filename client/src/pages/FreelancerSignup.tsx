import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const subcategories = [
  // Writing
  { id: "writing-auctioneer", name: "Writer–Auctioneer", category: "Writing" },
  { id: "writing-ritual", name: "Ritual Copywriter", category: "Writing" },
  { id: "writing-microstory", name: "Micro‑Story Artisan", category: "Writing" },
  { id: "writing-conversion", name: "Conversion Bard", category: "Writing" },
  { id: "writing-persona", name: "Persona Architect", category: "Writing" },
  { id: "writing-technical", name: "Technical Summarist", category: "Writing" },
  { id: "writing-ghostwriter", name: "Ghostwriter for Founders", category: "Writing" },
  { id: "writing-emotional", name: "Emotional Logic Writer", category: "Writing" },
  { id: "writing-worldbuilding", name: "Worldbuilding Scribe", category: "Writing" },
  { id: "writing-dialogue", name: "Dialogue Tailor", category: "Writing" },
  { id: "writing-brand-scripture", name: "Brand Scripture Writer", category: "Writing" },

  // Web Design
  { id: "webdesign-ux", name: "UX Ritualist", category: "Web Design" },
  { id: "webdesign-microinteraction", name: "Micro‑Interaction Designer", category: "Web Design" },
  { id: "webdesign-conversion", name: "Conversion Layout Engineer", category: "Web Design" },
  { id: "webdesign-brand", name: "Brand‑First Web Stylist", category: "Web Design" },
  { id: "webdesign-nocode", name: "No‑Code / Webflow Specialist", category: "Web Design" },
  { id: "webdesign-accessibility", name: "Accessibility‑Focused Designer", category: "Web Design" },

  // Video Editing
  { id: "video-cinematic", name: "Cinematic Story Cutter", category: "Video Editing" },
  { id: "video-social", name: "Social Pulse Editor", category: "Video Editing" },
  { id: "video-motion", name: "Motion Graphics Alchemist", category: "Video Editing" },
  { id: "video-documentary", name: "Documentary Narrative Editor", category: "Video Editing" },
  { id: "video-musicsynced", name: "Music‑Synced Visual Cutter", category: "Video Editing" },
  { id: "video-colorgrading", name: "Color Grading Specialist", category: "Video Editing" },

  // Consulting
  { id: "consulting-systems", name: "Systems & Workflow Architect", category: "Consulting" },
  { id: "consulting-brand", name: "Brand Identity Strategist", category: "Consulting" },
  { id: "consulting-business", name: "Business Clarity Consultant", category: "Consulting" },
  { id: "consulting-digital", name: "Digital Transformation Advisor", category: "Consulting" },
  { id: "consulting-market", name: "Market Positioning Analyst", category: "Consulting" },

  // Programming
  { id: "programming-fullstack", name: "Full‑Stack Problem Solver", category: "Programming" },
  { id: "programming-api", name: "API Integration Specialist", category: "Programming" },
  { id: "programming-nocode", name: "No‑Code / Low‑Code Engineer", category: "Programming" },
  { id: "programming-performance", name: "Performance & Optimization Developer", category: "Programming" },
  { id: "programming-security", name: "Security & Compliance Coder", category: "Programming" },

  // Marketing
  { id: "marketing-funnel", name: "Funnel & Conversion Strategist", category: "Marketing" },
  { id: "marketing-social", name: "Social Presence Architect", category: "Marketing" },
  { id: "marketing-ads", name: "Paid Ads Technician", category: "Marketing" },
  { id: "marketing-community", name: "Community Growth Engineer", category: "Marketing" },
  { id: "marketing-analytics", name: "Analytics & Insights Specialist", category: "Marketing" },

  // Music
  { id: "music-genre", name: "Genre‑Fusion Composer", category: "Music" },
  { id: "music-vocal", name: "Vocal Production Specialist", category: "Music" },
  { id: "music-beat", name: "Beat Architect", category: "Music" },
  { id: "music-mixing", name: "Mixing & Mastering Engineer", category: "Music" },
  { id: "music-sound", name: "Sound Identity Designer", category: "Music" }
];

type SignupStep = "account" | "profile" | "specialization" | "pricing" | "complete";

export default function FreelancerSignup() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<SignupStep>("account");

  // Account Step
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Profile Step
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  // Specialization Step
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  // Pricing Step
  const [minProjectSize, setMinProjectSize] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const categories = Array.from(new Set(subcategories.map(s => s.category)));
  const filteredSubcategories = selectedCategory
    ? subcategories.filter(s => s.category === selectedCategory)
    : [];

  const toggleSubcategory = (id: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === "account") setStep("profile");
    else if (step === "profile") setStep("specialization");
    else if (step === "specialization") setStep("pricing");
    else if (step === "pricing") setStep("complete");
  };

  const handleBack = () => {
    if (step === "profile") setStep("account");
    else if (step === "specialization") setStep("profile");
    else if (step === "pricing") setStep("specialization");
  };

  const canProceed = () => {
    if (step === "account") return email && password && confirmPassword && password === confirmPassword;
    if (step === "profile") return fullName && bio && hourlyRate;
    if (step === "specialization") return selectedCategory && selectedSubcategories.length > 0;
    if (step === "pricing") return minProjectSize && portfolio;
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Join as a Freelancer</h1>
          <p className="text-lg text-muted-foreground">Build your profile and start earning</p>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-2 mb-12">
          {(["account", "profile", "specialization", "pricing", "complete"] as SignupStep[]).map((s, idx) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : (["account", "profile", "specialization", "pricing", "complete"].indexOf(step) > idx
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground")
                }`}
              >
                {["account", "profile", "specialization", "pricing", "complete"].indexOf(step) > idx ? "✓" : idx + 1}
              </div>
              {idx < 4 && <div className="flex-1 h-1 bg-muted" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <Card className="p-8">
          {/* Account Step */}
          {step === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
                <p className="text-muted-foreground mb-6">Start by setting up your login credentials</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {password && confirmPassword && password !== confirmPassword && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 text-sm text-red-600 dark:text-red-400">
                  Passwords do not match
                </div>
              )}
            </div>
          )}

          {/* Profile Step */}
          {step === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <p className="text-muted-foreground mb-6">Tell us about yourself</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea
                  placeholder="Tell clients about your experience, skills, and what makes you unique..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Hourly Rate ($)</label>
                <Input
                  type="number"
                  placeholder="150"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Specialization Step */}
          {step === "specialization" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Specializations</h2>
                <p className="text-muted-foreground mb-6">Select your primary category and specializations</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Primary Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSubcategories([]);
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Your Specializations (at least 1)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredSubcategories.map(sub => (
                      <Button
                        key={sub.id}
                        variant={selectedSubcategories.includes(sub.id) ? "default" : "outline"}
                        onClick={() => toggleSubcategory(sub.id)}
                        className="justify-start"
                      >
                        <CheckCircle className={`w-4 h-4 mr-2 ${selectedSubcategories.includes(sub.id) ? "" : "opacity-0"}`} />
                        {sub.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pricing Step */}
          {step === "pricing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Pricing & Portfolio</h2>
                <p className="text-muted-foreground mb-6">Set your minimum project size and showcase your work</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Project Size ($)</label>
                <Input
                  type="number"
                  placeholder="1500"
                  value={minProjectSize}
                  onChange={(e) => setMinProjectSize(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Clients will see this as your starting price</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Portfolio Items</label>
                <Textarea
                  placeholder="List your portfolio items (one per line)&#10;e.g.&#10;Stripe Case Study&#10;Shopify Landing Page&#10;HubSpot Email Campaign"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground mt-1">Add links or descriptions of your best work</p>
              </div>
            </div>
          )}

          {/* Complete Step */}
          {step === "complete" && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Profile Created!</h2>
                <p className="text-muted-foreground mb-6">
                  Welcome to Benny's Emporium! Your profile is now live and clients can start finding you.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-300">
                <p className="font-semibold mb-2">Next Steps:</p>
                <ul className="space-y-1 text-left">
                  <li>✓ Complete your profile with a professional photo</li>
                  <li>✓ Add testimonials from past clients</li>
                  <li>✓ Set up your payment methods</li>
                  <li>✓ Start receiving project inquiries</li>
                </ul>
              </div>

              <Button
                onClick={() => navigate("/freelance")}
                className="w-full gap-2"
              >
                View Your Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== "complete" && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === "account"}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 gap-2"
              >
                {step === "pricing" ? "Complete" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already a freelancer?{" "}
            <button onClick={() => navigate("/login")} className="text-primary hover:underline font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
