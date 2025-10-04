import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/faq-hero.jpg";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a trip with GlobeExtra Travel Co.?",
      answer: "Simply fill out our trip planning form with your destination preferences, travel dates, and budget. Our travel experts will contact you within 24 hours to discuss your personalized itinerary and finalize booking details.",
    },
    {
      question: "What's included in your travel planning service?",
      answer: "Our service includes personalized itinerary creation, accommodation bookings, activity reservations, local guide recommendations, 24/7 trip support, and insider tips from our destination experts. We tailor everything to match your travel style and interests.",
    },
    {
      question: "Do you offer group travel or only individual trips?",
      answer: "We accommodate both! Whether you're traveling solo, as a couple, with family, or in a group, we create customized experiences that suit your party size and dynamics.",
    },
    {
      question: "What are the payment terms for trip bookings?",
      answer: "We typically require a 30% deposit to secure bookings, with the balance due 30 days before departure. Payment plans are available for larger trips. We accept major credit cards, bank transfers, and digital payment platforms.",
    },
    {
      question: "What happens if I need to cancel or change my trip?",
      answer: "Cancellation and change policies vary by destination and booking type. We always recommend travel insurance and will work with you to minimize fees wherever possible. Our team will guide you through the process if circumstances change.",
    },
    {
      question: "Are the remote job positions full-time or part-time?",
      answer: "We offer both full-time and flexible part-time positions depending on the role. All positions are remote and include comprehensive training. You can discuss your availability preferences during the interview process.",
    },
    {
      question: "Do I need travel experience to apply for remote positions?",
      answer: "Not necessarily! While travel experience is a plus, we value enthusiasm, strong communication skills, and a willingness to learn. We provide thorough training for all positions to ensure you're successful in your role.",
    },
    {
      question: "How quickly can you plan a last-minute trip?",
      answer: "We can accommodate last-minute requests depending on destination availability and seasonality. Contact us directly for urgent travel needs, and we'll do our best to create an amazing experience on short notice.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about traveling with GlobeExtra"
        backgroundImage={heroImage}
        height="small"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a href="/contact" className="text-primary hover:text-secondary font-semibold underline">
              Contact us directly
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
