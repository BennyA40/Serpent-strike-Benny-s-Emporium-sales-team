import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  quote: string;
  experience: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative py-12">
      <div className="bg-card border border-border rounded-lg p-12 shadow-sm">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-2xl md:text-3xl font-bold text-primary mb-8 leading-relaxed">
          "{currentTestimonial.quote}"
        </blockquote>

        {/* Experience */}
        <p className="text-lg text-foreground/70 mb-8 italic">
          {currentTestimonial.experience}
        </p>

        {/* Author */}
        <div className="mb-8">
          <p className="font-bold text-primary text-lg">{currentTestimonial.name}</p>
          <p className="text-foreground/60">{currentTestimonial.location}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setIsAutoPlay(false)}
            className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-secondary" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-secondary/30 w-2 hover:bg-secondary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            onMouseEnter={() => setIsAutoPlay(false)}
            className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-secondary" />
          </button>
        </div>

        {/* Auto-play indicator */}
        <p className="text-center text-sm text-foreground/50 mt-6">
          {isAutoPlay ? "Auto-playing..." : "Paused"}
        </p>
      </div>
    </div>
  );
}
