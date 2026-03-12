import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { DollarSign, TrendingUp, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function LoanHub() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"apply" | "offers" | "partner">("apply");
  const [formData, setFormData] = useState({
    loanType: "mca",
    loanAmount: "",
    businessName: "",
    monthlyRevenue: "",
    creditScore: "",
    purpose: "",
  });

  const { data: myApplications } = trpc.loans.getMyApplications.useQuery(undefined, {
    enabled: !!user,
  });

  const createApplicationMutation = trpc.loans.createApplication.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createApplicationMutation.mutateAsync({
        userId: user.id,
        loanType: formData.loanType as any,
        loanAmount: formData.loanAmount,
        businessName: formData.businessName,
        monthlyRevenue: formData.monthlyRevenue,
        creditScore: formData.creditScore ? parseInt(formData.creditScore) : undefined,
        purpose: formData.purpose,
      });
      setFormData({
        loanType: "mca",
        loanAmount: "",
        businessName: "",
        monthlyRevenue: "",
        creditScore: "",
        purpose: "",
      });
    } catch (error) {
      console.error("Failed to create application:", error);
    }
  };

  const loanTypes = [
    { value: "mca", label: "Merchant Cash Advance", rate: "5-8%" },
    { value: "term_loan", label: "Term Loan", rate: "4-7%" },
    { value: "loc", label: "Line of Credit", rate: "6-9%" },
    { value: "equipment", label: "Equipment Financing", rate: "5-8%" },
    { value: "personal", label: "Personal Loan", rate: "7-12%" },
    { value: "business", label: "Business Loan", rate: "5-10%" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <span className="font-bold text-secondary text-lg">Benny's Emporium</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Loan Brokering Hub</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Fast Capital. Clear Terms. Real Answers.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Pre-qualification in minutes. Funding in hours. Access 50+ lenders. No hidden fees.
          </p>
          <div className="flex gap-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8 py-3 text-lg">
              Get Pre-Qualified
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* View Mode Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex gap-4">
            <Button
              variant={viewMode === "apply" ? "default" : "outline"}
              onClick={() => setViewMode("apply")}
              className="px-6"
            >
              Apply for Loan
            </Button>
            {user && (
              <>
                <Button
                  variant={viewMode === "offers" ? "default" : "outline"}
                  onClick={() => setViewMode("offers")}
                  className="px-6"
                >
                  My Applications
                </Button>
                <Button
                  variant={viewMode === "partner" ? "default" : "outline"}
                  onClick={() => setViewMode("partner")}
                  className="px-6"
                >
                  Partner Program
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Apply for Loan */}
      {viewMode === "apply" && (
        <section className="py-16 bg-background">
          <div className="container max-w-2xl">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-8">Quick Pre-Qualification</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Loan Type */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Loan Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {loanTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, loanType: type.value })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.loanType === type.value
                            ? "border-secondary bg-secondary/10"
                            : "border-border hover:border-secondary/50"
                        }`}
                      >
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-sm text-foreground/70">{type.rate}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Loan Amount Needed</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-foreground/50" />
                    <Input
                      type="number"
                      placeholder="e.g., 50000"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Name</label>
                  <Input
                    type="text"
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                {/* Monthly Revenue */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Revenue</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-foreground/50" />
                    <Input
                      type="number"
                      placeholder="e.g., 25000"
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Credit Score (Optional)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 720"
                    value={formData.creditScore}
                    onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Loan Purpose</label>
                  <Input
                    type="text"
                    placeholder="e.g., Working capital, equipment, expansion"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 text-lg"
                  disabled={createApplicationMutation.isPending}
                >
                  {createApplicationMutation.isPending ? "Submitting..." : "Get Pre-Qualified"}
                </Button>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  What Happens Next
                </h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ Instant qualification score</li>
                  <li>✓ Matched with 5-10 lenders</li>
                  <li>✓ Compare offers side-by-side</li>
                  <li>✓ Accept and get funded in 24-48 hours</li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* My Applications */}
      {viewMode === "offers" && (
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">My Applications</h2>

            {myApplications && myApplications.length > 0 ? (
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{app.loanType.replace(/_/g, " ").toUpperCase()}</h3>
                        <p className="text-foreground/70">Application ID: {app.applicationId.slice(0, 8)}...</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === "qualified"
                          ? "bg-green-500/20 text-green-700"
                          : app.status === "approved"
                          ? "bg-blue-500/20 text-blue-700"
                          : "bg-yellow-500/20 text-yellow-700"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-foreground/70">Loan Amount</p>
                        <p className="text-2xl font-bold text-secondary">${parseFloat(app.loanAmount).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Qualification Score</p>
                        <p className="text-2xl font-bold">{app.qualificationScore}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Status</p>
                        <p className="text-lg font-semibold capitalize">{app.status}</p>
                      </div>
                    </div>
                    <Button className="gap-2">
                      View Offers
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">You don't have any applications yet.</p>
                <Button
                  onClick={() => setViewMode("apply")}
                  className="bg-secondary hover:bg-secondary/90 text-primary"
                >
                  Start Your Application
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Partner Program */}
      {viewMode === "partner" && (
        <section className="py-16 bg-background">
          <div className="container max-w-3xl">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4">Join Our Partner Network</h2>
              <p className="text-foreground/70 mb-8">
                Earn commissions by referring borrowers to Benny's Emporium. Whether you're an agent, freelancer, or travel partner, we have a program for you.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-secondary/20">
                  <TrendingUp className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-bold mb-2">Agents</h3>
                  <p className="text-sm text-foreground/70 mb-4">Earn 3-5% per referral</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Card>

                <Card className="p-6 border-secondary/20">
                  <Zap className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-bold mb-2">Freelancers</h3>
                  <p className="text-sm text-foreground/70 mb-4">Earn 2-4% per referral</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Card>

                <Card className="p-6 border-secondary/20">
                  <DollarSign className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-bold mb-2">Travel Partners</h3>
                  <p className="text-sm text-foreground/70 mb-4">Earn 2-3% per referral</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Card>
              </div>

              <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 text-lg">
                Become a Partner
              </Button>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-primary/80 text-white py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-white/70 mb-4">
            © 2026 Benny's Emporium Loan Brokering Hub. All rights reserved.
          </p>
          <Link href="/" className="text-secondary hover:text-secondary/80 transition-colors inline-block">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
