import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/about-hero.jpg";

const About = () => {
  const team = [
    {
      name: "Sarah Mitchell",
      role: "Creative Founder",
      bio: "A globetrotter with 15+ years of travel industry experience, Sarah founded Nomadia to make meaningful travel accessible to everyone.",
    },
    {
      name: "Marcus Chen",
      role: "Travel Lead",
      bio: "Former luxury travel advisor turned destination curator, Marcus brings expertise in crafting unforgettable journeys.",
    },
    {
      name: "Priya Patel",
      role: "Operations Manager",
      bio: "With a background in logistics and hospitality, Priya ensures every trip runs smoothly from start to finish.",
    },
    {
      name: "Jordan Rivers",
      role: "Content Director",
      bio: "Award-winning travel writer and photographer, Jordan captures the essence of each destination through compelling stories.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        title="Our Story"
        subtitle="Redefining travel for the modern explorer"
        backgroundImage={heroImage}
        height="medium"
      />

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-center">About Nomadia Travel Co.</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Nomadia Travel Co. was founded with a mission to redefine travel for the modern explorer — where meaningful 
                journeys meet flexibility and opportunity. We believe that travel should be more than just checking off 
                destinations; it should be about creating connections, embracing cultures, and finding purpose along the way.
              </p>
              <p>
                Our team blends expertise in travel planning, content creation, and operations to make exploration seamless 
                and accessible. Whether you're a solo adventurer, a family seeking new experiences, or a remote worker looking 
                for your next base, we're here to help you navigate the world with confidence.
              </p>
              <p>
                From personalized itineraries to remote job opportunities, we're committed to supporting both travelers and 
                those who want to make travel their lifestyle. At Nomadia, we're not just planning trips — we're building 
                a community of curious minds and passionate explorers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Authentic Experiences</h3>
              <p className="text-muted-foreground">
                We prioritize genuine cultural connections over tourist traps, ensuring every journey is meaningful.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Personalized Service</h3>
              <p className="text-muted-foreground">
                Every traveler is unique, and so is every itinerary we create. Your dreams guide our planning.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Work-Life Balance</h3>
              <p className="text-muted-foreground">
                We support remote professionals who want to explore the world without sacrificing their careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl text-white">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
