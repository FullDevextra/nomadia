import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-24 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-8">Terms & Conditions</h1>
            <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Nomadia Travel Co.'s services, you accept and agree to be bound by these Terms and Conditions. 
                  If you do not agree with any part of these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">2. Services Provided</h2>
                <p>
                  Nomadia Travel Co. provides travel planning services, destination recommendations, and remote employment opportunities. 
                  We act as an intermediary between travelers and service providers. We are not responsible for the actions, errors, 
                  omissions, representations, warranties, or breaches of third-party suppliers.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">3. Booking and Payment</h2>
                <p>
                  All bookings require a deposit at the time of reservation. Full payment is typically due 30 days before departure. 
                  Prices are subject to change until payment is received in full. We reserve the right to cancel any booking if 
                  payment is not received by the due date.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">4. Cancellation Policy</h2>
                <p>
                  Cancellation policies vary by destination and service provider. In general, cancellations made more than 60 days 
                  before departure may receive a partial refund minus administrative fees. Cancellations made within 60 days of 
                  departure may be subject to higher penalties. We strongly recommend purchasing travel insurance.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">5. Travel Insurance</h2>
                <p>
                  We highly recommend purchasing comprehensive travel insurance to protect against unforeseen circumstances, 
                  including but not limited to trip cancellations, medical emergencies, and travel delays.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">6. Traveler Responsibilities</h2>
                <p>
                  Travelers are responsible for ensuring they have valid passports, visas, and any required vaccinations or health 
                  documents. It is your responsibility to check entry requirements for your destination countries and comply with 
                  all local laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">7. Remote Employment</h2>
                <p>
                  Employment opportunities advertised by Nomadia Travel Co. are subject to separate employment agreements. 
                  Application does not guarantee employment. All positions are contingent upon successful completion of 
                  background checks and reference verifications as required by law.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">8. Limitation of Liability</h2>
                <p>
                  Nomadia Travel Co. shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  arising out of or relating to your use of our services. Our total liability shall not exceed the amount paid by 
                  you for the specific service in question.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to 
                  our website. Your continued use of our services following any changes constitutes acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">10. Contact Information</h2>
                <p>
                  For questions about these Terms & Conditions, please contact us at:
                  <br />
                  Email: info@nomadiatravel.co
                  <br />
                  Phone: +1 (630) 949-3644
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
