import DestinationTemplate from "../DestinationTemplate";

const baliData = {
  name: "Bali",
  country: "Indonesia",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/travel-service-visual-FzssFG3yvmGZbhhYniXQD3.webp",
  description: "Discover tropical paradise with pristine beaches, ancient temples, lush rice terraces, and world-class wellness retreats in Bali.",
  highlights: [
    "Luxury beach resorts and private villas",
    "Wellness retreats and spa experiences",
    "Ancient temples and spiritual experiences",
    "Surfing and water sports",
    "Rice terrace trekking and nature tours",
    "Traditional Balinese culture and cuisine"
  ],
  bestTime: "April to October offers dry weather and clear skies. May to August is peak season with the best conditions for outdoor activities.",
  packages: [
    {
      id: 1,
      name: "Wellness Retreat Paradise",
      description: "All-inclusive wellness resort with yoga, spa treatments, healthy cuisine, and meditation",
      price: "From $1,699",
      duration: "7 days",
      highlights: ["Yoga & meditation", "Spa treatments", "Healthy cuisine", "Wellness coaching"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Adventure & Culture",
      description: "Temple tours, rice terrace hikes, surfing lessons, and cultural immersion experiences",
      price: "From $1,499",
      duration: "6 days",
      highlights: ["Temple tours", "Hiking", "Surfing", "Cultural experiences"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Luxury Beach Escape",
      description: "5-star beachfront resort with private beach access, water sports, and fine dining",
      price: "From $2,299",
      duration: "5 days",
      highlights: ["Beachfront resort", "Water sports", "Fine dining", "Private beach"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function Bali() {
  return <DestinationTemplate destination={baliData} />;
}
