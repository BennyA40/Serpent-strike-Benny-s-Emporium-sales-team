import { useState } from "react";
import { Search, X } from "lucide-react";

export interface FilterCriteria {
  destination: string;
  minPrice: number;
  maxPrice: number;
  activityType: string;
  duration: string;
}

interface SearchFilterProps {
  onFilter: (criteria: FilterCriteria) => void;
}

const destinations = [
  "All Destinations",
  "Paris",
  "Bali",
  "Tokyo",
  "Caribbean",
  "New York",
  "Dubai",
  "London",
  "Barcelona",
  "Maldives"
];

const activityTypes = [
  "All Activities",
  "Wellness & Spa",
  "Adventure",
  "Cultural",
  "Fine Dining",
  "Sports & Events",
  "Concerts",
  "Luxury Resorts",
  "Cruises"
];

const durations = [
  "All Durations",
  "3-5 days",
  "5-7 days",
  "7-10 days",
  "10+ days"
];

export default function SearchFilter({ onFilter }: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria>({
    destination: "All Destinations",
    minPrice: 0,
    maxPrice: 10000,
    activityType: "All Activities",
    duration: "All Durations"
  });

  const handleFilterChange = (key: keyof FilterCriteria, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterCriteria = {
      destination: "All Destinations",
      minPrice: 0,
      maxPrice: 10000,
      activityType: "All Activities",
      duration: "All Durations"
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const isFiltered = 
    filters.destination !== "All Destinations" ||
    filters.activityType !== "All Activities" ||
    filters.duration !== "All Durations" ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000;

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-lg hover:border-secondary/50 transition-all duration-300"
        >
          <Search className="w-5 h-5 text-secondary" />
          <span className="flex-1 text-left text-foreground/70">
            {isFiltered ? `Filters Applied (${Object.values(filters).filter(v => v !== "All Destinations" && v !== "All Activities" && v !== "All Durations" && v !== 0 && v !== 10000).length})` : "Search and filter packages..."}
          </span>
          {isExpanded ? (
            <X className="w-5 h-5 text-foreground/50" />
          ) : (
            <span className="text-foreground/50">↓</span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {isExpanded && (
        <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-6 animate-in fade-in duration-300">
          {/* Destination Filter */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-3">
              Destination
            </label>
            <select
              value={filters.destination}
              onChange={(e) => handleFilterChange("destination", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-secondary"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-3">
              Activity Type
            </label>
            <select
              value={filters.activityType}
              onChange={(e) => handleFilterChange("activityType", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-secondary"
            >
              {activityTypes.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-3">
              Trip Duration
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-secondary"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-3">
              Price Range: ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-secondary/10 transition-colors"
            >
              Reset Filters
            </button>
          )}

          {/* Apply Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full px-4 py-3 bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
