import DestinationTemplate from "../DestinationTemplate";

const dubaiData = {
  name: "Dubai",
  country: "United Arab Emirates",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/airport-modern_c09a6d9b.jpg",
  description: "Experience ultra-luxury and modern marvels in Dubai, where world-class shopping, stunning architecture, and desert adventures await.",
  highlights: [
    "Iconic Burj Khalifa and modern architecture",
    "Luxury shopping and designer boutiques",
    "Desert safari and adventure activities",
    "Pristine beaches and water sports",
    "Michelin-starred dining and fine cuisine",
    "Luxury spa and wellness experiences"
  ],
  bestTime: "November to March offers perfect weather with temperatures around 25°C. April to October is very hot and less ideal for outdoor activities.",
  packages: [
    {
      id: 1,
      name: "Luxury Dubai Experience",
      description: "5-star luxury hotel, desert safari, shopping tours, and fine dining experiences",
      price: "From $2,899",
      duration: "5 days",
      highlights: ["5-star hotel", "Desert safari", "Shopping tours", "Fine dining"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Adventure & Wellness",
      description: "Desert adventures, dune bashing, spa treatments, yoga, and wellness retreats",
      price: "From $1,699",
      duration: "6 days",
      highlights: ["Desert adventures", "Spa treatments", "Yoga", "Wellness programs"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Culinary & Beach Escape",
      description: "Michelin-starred restaurants, beach clubs, water sports, and gourmet experiences",
      price: "From $2,399",
      duration: "5 days",
      highlights: ["Michelin dining", "Beach clubs", "Water sports", "Gourmet cuisine"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function Dubai() {
  return <DestinationTemplate destination={dubaiData} />;
}
