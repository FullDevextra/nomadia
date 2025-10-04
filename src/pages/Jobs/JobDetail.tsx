import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const jobDetails = {
  "travel-consultant": {
    title: "Travel Consultant",
    description:
      "Plan trips, craft itineraries, and assist clients globally. Perfect for travel enthusiasts with excellent communication skills.",
    requirements: [
      "Strong communication & interpersonal skills",
      "Knowledge of travel planning and destination research",
      "Ability to manage multiple clients efficiently",
    ],
    tools: [
      "Laptop with pre-installed travel software",
      "Tablet for on-the-go client management",
      "Portable Wi-Fi router",
      "Company-branded travel kit (bag, notepad, pen)",
    ],
  },

  "customer-service": {
    title: "Customer Service Representative",
    description:
      "Provide support, resolve inquiries, and ensure client satisfaction through various communication channels.",
    requirements: [
      "Excellent written & verbal communication",
      "Problem-solving mindset",
      "Ability to manage calls, emails, and chats efficiently",
    ],
    tools: [
      "Noise-cancelling headset with microphone",
      "Laptop with customer management software",
      "Company smartphone (for verified communication)",
      "Office starter kit (mouse, keyboard, notepad)",
    ],
  },

  admin: {
    title: "Admin/Finance/Procurement Agent",
    description:
      "Handle administrative, financial, and purchasing tasks remotely. Strong organizational and documentation skills required.",
    requirements: [
      "Attention to detail",
      "Spreadsheet and financial record management skills",
      "Procurement and inventory tracking experience",
    ],
    tools: [
      "High-performance laptop with office suite",
      "All-in-one printer/scanner",
      "External hard drive for document backups",
      "Smart calculator and stationery set",
    ],
  },

  "content-creator": {
    title: "Video Editor & Content Creator",
    description:
      "Produce compelling travel videos and creative content that inspires wanderlust and showcases destinations.",
    requirements: [
      "Proficiency in video editing and photography",
      "Creative storytelling and brand awareness",
      "Knowledge of social media content trends",
    ],
    tools: [
      "4K Camera with tripod and gimbal",
      "High-performance laptop for video editing",
      "External SSD for media storage",
      "Lighting kit and lapel microphone",
      "Company-branded content backpack",
    ],
  },
};



export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? jobDetails[slug as keyof typeof jobDetails] : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    position: job?.title || "",
  });
  const [resume, setResume] = useState<File | null>(null);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let resumeUrl = null;

    try {
      // ✅ Step 1: Upload resume if provided
      if (resume) {
        const fileExt = resume.name.split(".").pop();
        const filePath = `resumes/${Date.now()}_${formData.firstName}_${formData.lastName}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("applications") // Make sure this bucket exists in Supabase
          .upload(filePath, resume);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("applications")
          .getPublicUrl(filePath);

        resumeUrl = publicUrlData.publicUrl;
      }

      // ✅ Step 2: Insert application record
      const { error } = await supabase.from("job_applications").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          position: job?.title,
          resume_url: resumeUrl,
        },
      ]);

      if (error) throw error;

      // ✅ Step 3: Trigger Email Notification
        await fetch(
        "https://obiedxhlppfiipyynubm.supabase.co/functions/v1/send-admin-email",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            applicant: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                position: job?.title,
                resume_url: resumeUrl,
            },
            }),
        }
        );

      toast.success("✅ Application received! We'll contact you soon via mail.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        position: job?.title || "",
      });
      setResume(null);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    }
  };

  if (!job) return <p className="p-8 text-center">Loading job details...</p>;

  return (
    <div>

      <Navigation />

      <section className="py-16 container mx-auto px-4 mt-6">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="mb-8 text-muted-foreground">{job.description}</p>

        <h2 className="text-xl font-semibold mt-6">Requirements:</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-6">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6">Tools Provided:</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-10">
          {job.tools.map((tool, i) => (
            <li key={i}>{tool}</li>
          ))}
        </ul>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h2 className="font-heading font-bold text-2xl mb-6 text-center">
              Apply for {job.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Address *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Resume (PDF, DOC, DOCX)</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
