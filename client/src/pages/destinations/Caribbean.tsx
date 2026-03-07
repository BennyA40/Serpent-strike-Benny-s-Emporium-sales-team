import DestinationTemplate from "../DestinationTemplate";

const caribbeanData = {
  name: "Caribbean",
  country: "Multiple Islands",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/river-cruise_10b3e896.jpg",
  description: "Escape to paradise with crystal-clear waters, pristine beaches, vibrant culture, and world-class resorts across the Caribbean islands.",
  highlights: [
    "Pristine white-sand beaches",
    "Crystal-clear turquoise waters",
    "Luxury all-inclusive resorts",
    "Snorkeling and diving",
    "Vibrant local culture and cuisine",
    "Tropical island hopping"
  ],
  bestTime: "December to April offers perfect weather with low humidity. May to November is hurricane season but features lower prices and fewer crowds.",
  packages: [
    {
      id: 1,
      name: "All-Inclusive Island Escape",
      description: "5-star all-inclusive resort with unlimited dining, drinks, water sports, and beach access",
      price: "From $1,999",
      duration: "7 days",
      highlights: ["All-inclusive", "Water sports", "Beach access", "Unlimited dining"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Island Hopping Adventure",
      description: "Multi-island cruise with snorkeling, diving, cultural tours, and beach exploration",
      price: "From $2,299",
      duration: "8 days",
      highlights: ["Island hopping", "Snorkeling", "Diving", "Cultural tours"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Luxury Yacht Experience",
      description: "Private yacht charter with captain, crew, gourmet dining, and exclusive island access",
      price: "From $4,999",
      duration: "7 days",
      highlights: ["Private yacht", "Gourmet dining", "Exclusive islands", "Water activities"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function Caribbean() {
  return <DestinationTemplate destination={caribbeanData} />;
}
