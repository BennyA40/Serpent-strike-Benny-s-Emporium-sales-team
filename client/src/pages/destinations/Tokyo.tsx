import DestinationTemplate from "../DestinationTemplate";

const tokyoData = {
  name: "Tokyo",
  country: "Japan",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/airport-modern_c09a6d9b.jpg",
  description: "Experience the perfect blend of ancient tradition and cutting-edge modernity in Tokyo, Japan's vibrant capital city.",
  highlights: [
    "Iconic temples and shrines",
    "World-class dining and Michelin-starred restaurants",
    "Shopping districts and technology hubs",
    "Traditional tea ceremonies and cultural experiences",
    "Cherry blossom viewing (seasonal)",
    "Sumo wrestling and martial arts experiences"
  ],
  bestTime: "March to May (cherry blossoms) and September to November (autumn colors) are ideal. Summer is hot and humid, while winter is cold but clear.",
  packages: [
    {
      id: 1,
      name: "Modern Tokyo Experience",
      description: "Luxury hotel in Shibuya, shopping tours, technology district exploration, and fine dining",
      price: "From $2,199",
      duration: "5 days",
      highlights: ["Luxury hotel", "Shopping tours", "Tech exploration", "Fine dining"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Traditional Japan",
      description: "Temple visits, tea ceremonies, traditional crafts workshops, and authentic local cuisine",
      price: "From $1,799",
      duration: "6 days",
      highlights: ["Temple tours", "Tea ceremonies", "Craft workshops", "Local cuisine"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Culinary Journey",
      description: "Michelin-starred restaurant reservations, sushi-making classes, sake tastings, and food tours",
      price: "From $2,599",
      duration: "7 days",
      highlights: ["Michelin dining", "Sushi classes", "Sake tastings", "Food tours"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function Tokyo() {
  return <DestinationTemplate destination={tokyoData} />;
}
