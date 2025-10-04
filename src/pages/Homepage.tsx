import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users, Clock, Briefcase, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import DestinationCard from "@/components/DestinationCard";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-travel.jpg";
import capeImg from "@/assets/cape-town.jpg";
import palermoImg from "@/assets/palermo.jpg";
import bangkokImg from "@/assets/bangkok.jpg";
import marseilleImg from "@/assets/marseille.jpg";

const Homepage = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! Check your email for travel inspiration.");
      setEmail("");
    }
  };

  const features = [
    {
      icon: MapPin,
      title: "Tailored Travel Itineraries",
      description: "Personalized journeys designed around your interests, budget, and travel style.",
    },
    {
      icon: Users,
      title: "Local Insider Access",
      description: "Connect with authentic experiences and hidden gems through our local partners.",
    },
    {
      icon: Clock,
      title: "24/7 Trip Support",
      description: "Round-the-clock assistance to ensure your journey is smooth and worry-free.",
    },
    {
      icon: Briefcase,
      title: "Remote Job Opportunities",
      description: "Explore flexible work options that let you earn while you explore the world.",
    },
  ];

  const destinations = [
    {
      image: capeImg,
      city: "Cape Town",
      country: "South Africa",
      flag: "🇿🇦",
      description: "Stunning coastlines, vibrant culture, and breathtaking mountain views.",
    },
    {
      image: palermoImg,
      city: "Palermo",
      country: "Italy",
      flag: "🇮🇹",
      description: "Rich history, incredible cuisine, and Mediterranean charm at its finest.",
    },
    {
      image: bangkokImg,
      city: "Bangkok",
      country: "Thailand",
      flag: "🇹🇭",
      description: "Dynamic street life, ornate temples, and world-class street food.",
    },
    {
      image: marseilleImg,
      city: "Marseille",
      country: "France",
      flag: "🇫🇷",
      description: "Coastal beauty, cultural diversity, and authentic French lifestyle.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <Hero
        title="Discover Unique Travel Experiences"
        subtitle="Personalized journeys, curated destinations, and global remote opportunities."
        backgroundImage={heroImage}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Link to="/plan-trip">Plan Your Trip</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
            <Link to="/jobs">Apply for Remote Jobs</Link>
          </Button>
        </div>
      </Hero>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">About GlobeExtra Travel Co.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At GlobeExtra Travel Co., we believe that travel is more than movement — it's meaning. We design personalized 
              journeys that reflect each traveler's lifestyle, curiosity, and pace. Whether you're planning your dream trip 
              or exploring flexible remote work, we help you discover a world of opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Featured Destinations</h2>
            <Button asChild variant="ghost" className="hidden md:flex text-primary hover:text-secondary">
              <Link to="/destinations">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <DestinationCard key={index} {...dest} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="ghost" className="text-primary hover:text-secondary">
              <Link to="/destinations">
                View All Destinations
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Remote Jobs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">You're Invited to Work With Us</h2>
            <p className="text-lg text-muted-foreground">
              Join our remote-first team of travel consultants, content creators, and support professionals. 
              Work from anywhere while helping others discover the world.
            </p>
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-secondary text-primary-foreground">
              <Link to="/jobs">Explore Job Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Stay Connected</h2>
            <p className="text-lg opacity-90 mb-8">
              Get exclusive travel updates, destination guides, and job alerts delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-foreground border-none flex-1"
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
