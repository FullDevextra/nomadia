import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import heroImage from "@/assets/plan-trip-hero.jpg";

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    destinations: "",
    travelDates: "",
    budget: "",
    tripType: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks! A GlobeExtra travel expert will reach out shortly.");
    setFormData({
      fullName: "",
      email: "",
      destinations: "",
      travelDates: "",
      budget: "",
      tripType: "",
      notes: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        title="Start Planning Your Journey"
        subtitle="Share your vision, budget, and travel style. We'll handle the details."
        backgroundImage={heroImage}
        height="medium"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destinations">Destination(s) *</Label>
                  <Input
                    id="destinations"
                    value={formData.destinations}
                    onChange={(e) => handleChange("destinations", e.target.value)}
                    required
                    placeholder="e.g., Italy, Thailand, South Africa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelDates">Travel Dates *</Label>
                  <Input
                    id="travelDates"
                    value={formData.travelDates}
                    onChange={(e) => handleChange("travelDates", e.target.value)}
                    required
                    placeholder="e.g., June 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    required
                    placeholder="e.g., $3,000 - $5,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tripType">Type of Trip *</Label>
                  <Select value={formData.tripType} onValueChange={(value) => handleChange("tripType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder="Tell us more about your travel preferences, interests, or special requirements..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-secondary text-primary-foreground" size="lg">
                  Get My Plan
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

export default PlanTrip;
