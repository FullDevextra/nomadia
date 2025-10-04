import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/jobs-hero.jpg";

const Jobs = () => {
  const jobs = [
    {
      slug: "travel-consultant",
      title: "Travel Consultant",
      description:
        "Plan trips, craft itineraries, and assist clients globally. Perfect for travel enthusiasts with excellent communication skills.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      slug: "customer-service",
      title: "Customer Service Representative",
      description:
        "Provide support, resolve inquiries, and ensure client satisfaction through various communication channels.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      slug: "admin",
      title: "Admin/Finance/Procurement Agent",
      description:
        "Handle administrative and purchasing tasks remotely. Strong organizational skills required.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      slug: "content-creator",
      title: "Video Editor & Content Creator",
      description:
        "Produce compelling travel videos and creative content that inspires wanderlust and showcases destinations.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navigation */}
      <Navigation />

      {/* ✅ Hero Section */}
      <Hero
        title="Work From Anywhere. Grow With Us."
        subtitle="Explore flexible roles at GlobeExtra Travel Co. We welcome passionate individuals who love travel, creativity, and remote collaboration."
        backgroundImage={heroImage}
        height="medium"
      />

      {/* ✅ Job Listings */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Open Positions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobs.map((job) => (
              <Card
                key={job.slug}
                className="p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                  <p className="mt-3 font-medium text-primary">
                    {job.rate} • {job.location}
                  </p>
                </div>

                <div className="mt-6">
                  <Link to={`/jobs/${job.slug}`}>
                    <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">
                      View & Apply
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Jobs;
