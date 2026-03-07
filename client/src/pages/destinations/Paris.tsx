import DestinationTemplate from "../DestinationTemplate";

const parisData = {
  name: "Paris",
  country: "France",
  heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hero-background-ARQSEKJVpkFyGn3iesDoqe.webp",
  description: "The City of Light awaits. Experience world-class art, exquisite cuisine, romantic strolls along the Seine, and the timeless elegance of Paris.",
  highlights: [
    "Iconic landmarks: Eiffel Tower, Louvre, Notre-Dame",
    "Michelin-starred dining and culinary experiences",
    "World-class museums and art galleries",
    "Charming neighborhoods and cafés",
    "Seine river cruises and romantic experiences",
    "Shopping on the Champs-Élysées"
  ],
  bestTime: "April to June and September to October offer pleasant weather and fewer crowds. Spring brings blooming gardens, while autumn showcases golden light perfect for sightseeing.",
  packages: [
    {
      id: 1,
      name: "Parisian Romance",
      description: "5-star luxury hotel with Seine river views, fine dining experiences, and guided city tours",
      price: "From $2,899",
      duration: "5 days",
      highlights: ["5-star hotel", "Fine dining", "Guided tours", "River cruise"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/hotel-luxury_4159c6ef.jpg"
    },
    {
      id: 2,
      name: "Art & Culture Immersion",
      description: "Museum passes, private art tours, and cultural experiences with expert guides",
      price: "From $1,899",
      duration: "4 days",
      highlights: ["Museum passes", "Private tours", "Art workshops", "Cultural events"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/service-cards-bg-665dGpUCZGo2npWxSiPpaS.webp"
    },
    {
      id: 3,
      name: "Culinary Excellence",
      description: "Michelin-starred restaurant reservations, cooking classes, and wine tastings",
      price: "From $2,499",
      duration: "6 days",
      highlights: ["Michelin dining", "Cooking classes", "Wine tastings", "Gourmet tours"],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663342087978/hpMFvQgt7mSt3LmbrDcdGW/opportunity-pattern-eigGZCbrRpNao8P5pB6828.webp"
    }
  ]
};

export default function Paris() {
  return <DestinationTemplate destination={parisData} />;
}
