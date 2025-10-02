import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/destinations-hero.jpg";
import capeImg from "@/assets/cape-town.jpg";
import palermoImg from "@/assets/palermo.jpg";
import bangkokImg from "@/assets/bangkok.jpg";
import marseilleImg from "@/assets/marseille.jpg";

const Destinations = () => {
  const [filter, setFilter] = useState("All");

  const destinations = [
    {
      image: capeImg,
      city: "Cape Town",
      country: "South Africa",
      flag: "🇿🇦",
      description: "Stunning coastlines, vibrant culture, and breathtaking mountain views await in this diverse African gem.",
      region: "Africa",
    },
    {
      image: palermoImg,
      city: "Palermo",
      country: "Italy",
      flag: "🇮🇹",
      description: "Rich history, incredible cuisine, and Mediterranean charm make Palermo an unforgettable experience.",
      region: "Europe",
    },
    {
      image: bangkokImg,
      city: "Bangkok",
      country: "Thailand",
      flag: "🇹🇭",
      description: "Dynamic street life, ornate temples, and world-class street food define this vibrant Asian capital.",
      region: "Asia",
    },
    {
      image: marseilleImg,
      city: "Marseille",
      country: "France",
      flag: "🇫🇷",
      description: "Coastal beauty, cultural diversity, and authentic French lifestyle blend perfectly in this port city.",
      region: "Europe",
    },
  ];

  const regions = ["All", "Africa", "Europe", "Asia", "Americas"];

  const filteredDestinations =
    filter === "All" ? destinations : destinations.filter((d) => d.region === filter);

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        title="Explore the World with Confidence"
        subtitle="Discover curated destinations that match your travel style and dreams"
        backgroundImage={heroImage}
        height="medium"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {regions.map((region) => (
              <Button
                key={region}
                variant={filter === region ? "default" : "outline"}
                onClick={() => setFilter(region)}
                className={filter === region ? "bg-primary text-primary-foreground" : ""}
              >
                {region}
              </Button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, index) => (
              <DestinationCard key={index} {...dest} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No destinations found for this region.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us create a personalized itinerary that brings your travel dreams to life.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="/plan-trip">Start Planning Your Trip</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
