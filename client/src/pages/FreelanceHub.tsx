import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Star, Search, Filter, MapPin, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function FreelanceHub() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<"browse" | "myServices" | "myProjects">("browse");

  const { data: services } = trpc.freelance.listServices.useQuery({
    category: selectedCategory,
  });

  const { data: myServices } = trpc.freelance.getMyServices.useQuery(undefined, {
    enabled: viewMode === "myServices" && !!user,
  });

  const { data: myProjects } = trpc.freelance.getMyProjects.useQuery(undefined, {
    enabled: viewMode === "myProjects" && !!user,
  });

  const categories = [
    "Web Design",
    "Writing",
    "Graphic Design",
    "Video Editing",
    "Consulting",
    "Programming",
    "Marketing",
    "Music",
  ];

  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <span className="font-bold text-secondary text-lg">Benny's Emporium</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Freelance Solutions</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Hire Top Talent
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Connect with skilled freelancers for web design, writing, consulting, and more.
            Get your projects done by experts.
          </p>
        </div>
      </header>

      {/* View Mode Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex gap-4">
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
          </div>
        </div>
      </section>

      {/* Browse Services */}
      {viewMode === "browse" && (
        <section className="py-16 bg-background">
          <div className="container">
            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/50" />
                  <Input
                    placeholder="Search services..."
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
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === undefined ? "default" : "outline"}
                  onClick={() => setSelectedCategory(undefined)}
                  size="sm"
                >
                  All Categories
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {service.serviceImage && (
                    <img
                      src={service.serviceImage}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(Number(service.averageRating))
                                ? "fill-secondary text-secondary"
                                : "text-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-foreground/70">
                        ({service.totalReviews} reviews)
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-6 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {service.deliveryDays} days delivery
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        From ${service.price}
                      </div>
                    </div>

                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary">
                      Hire Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/70 text-lg">No services found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* My Services */}
      {viewMode === "myServices" && (
        <section className="py-16 bg-background">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">My Services</h2>
              <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                Create Service
              </Button>
            </div>

            {myServices && myServices.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myServices.map((service) => (
                  <Card key={service.id} className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-secondary">${service.price}</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">You haven't created any services yet.</p>
                <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                  Create Your First Service
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* My Projects */}
      {viewMode === "myProjects" && (
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">My Projects</h2>

            {myProjects && myProjects.length > 0 ? (
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-foreground/70 text-sm">{project.category}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === "completed"
                          ? "bg-green-500/20 text-green-700"
                          : project.status === "active"
                          ? "bg-blue-500/20 text-blue-700"
                          : "bg-yellow-500/20 text-yellow-700"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-foreground/70 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-secondary">
                        ${project.projectPrice}
                      </span>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70">You don't have any projects yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-primary/80 text-white py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-white/70 mb-4">
            © 2026 Benny's Emporium Freelance Solutions. All rights reserved.
          </p>
          <Link href="/" className="text-secondary hover:text-secondary/80 transition-colors inline-block">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
