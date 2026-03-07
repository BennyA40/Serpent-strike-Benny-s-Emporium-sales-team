import DestinationTemplate from "../DestinationTemplate";

const newyorkData = {
  name: "New York",
  country: "United States",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hero-background-ARQSEKJVpkFyGn3iesDoqe.webp",
  description: "The city that never sleeps awaits. Experience iconic landmarks, world-class museums, Broadway shows, and endless entertainment in New York City.",
  highlights: [
    "Iconic landmarks: Statue of Liberty, Empire State Building, Times Square",
    "Broadway shows and theater performances",
    "World-class museums and galleries",
    "Fine dining and diverse cuisine",
    "Shopping on Fifth Avenue and SoHo",
    "Central Park and urban green spaces"
  ],
  bestTime: "April to June and September to October offer pleasant weather. Fall foliage is spectacular in October. Winter brings holiday decorations and ice skating.",
  packages: [
    {
      id: 1,
      name: "Broadway & Culture",
      description: "5-star hotel, Broadway show tickets, museum passes, and guided city tours",
      price: "From $2,499",
      duration: "5 days",
      highlights: ["Broadway tickets", "Museum passes", "Guided tours", "5-star hotel"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Sports & Entertainment",
      description: "Premium tickets to major sporting events, concerts, and entertainment shows",
      price: "From $1,899",
      duration: "4 days",
      highlights: ["Sports tickets", "Concert tickets", "Entertainment", "VIP seating"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Culinary New York",
      description: "Michelin-starred restaurant reservations, food tours, and gourmet experiences",
      price: "From $2,199",
      duration: "6 days",
      highlights: ["Michelin dining", "Food tours", "Gourmet experiences", "Local cuisine"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function NewYork() {
  return <DestinationTemplate destination={newyorkData} />;
}
