import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import heroImage from "@/assets/jobs-hero.jpg";

const Jobs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
  });

  const jobs = [
    {
      title: "Travel Consultant",
      description: "Plan trips, craft itineraries, and assist clients globally. Perfect for travel enthusiasts with excellent communication skills.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      title: "Customer Service Representative",
      description: "Provide support, resolve inquiries, and ensure client satisfaction through various communication channels.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      title: "Admin/Finance/Procurement Agent",
      description: "Handle administrative and purchasing tasks remotely. Strong organizational skills required.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
    {
      title: "Video Editor & Content Creator",
      description: "Produce compelling travel videos and creative content that inspires wanderlust and showcases destinations.",
      rate: "$60/hr",
      location: "Remote",
      status: "Open",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your application has been received. Our team will contact you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      position: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        title="Work From Anywhere. Grow With Us."
        subtitle="Explore flexible roles at Nomadia Travel Co. We welcome passionate individuals who love travel, creativity, and remote collaboration."
        backgroundImage={heroImage}
        height="medium"
      />

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="font-heading font-bold text-2xl mb-6 text-center">Apply Now</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Select value={formData.position} onValueChange={(value) => handleChange("position", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel-consultant">Travel Consultant</SelectItem>
                      <SelectItem value="customer-service">Customer Service Representative</SelectItem>
                      <SelectItem value="admin">Admin/Finance/Procurement Agent</SelectItem>
                      <SelectItem value="content-creator">Video Editor & Content Creator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (Optional)</Label>
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                  <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX format</p>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-secondary text-primary-foreground" size="lg">
                  Schedule Interview
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
