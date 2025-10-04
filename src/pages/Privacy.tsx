import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-24 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, including but not limited to your name, email address, 
                  phone number, travel preferences, and payment information. We also collect information about your device 
                  and how you interact with our website through cookies and similar technologies.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your bookings and payments</li>
                  <li>Send you confirmations, updates, and customer support messages</li>
                  <li>Communicate with you about products, services, and promotional offers</li>
                  <li>Process employment applications</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">3. Information Sharing</h2>
                <p>
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Travel suppliers and vendors necessary to fulfill your bookings</li>
                  <li>Professional advisors such as lawyers and accountants</li>
                  <li>Law enforcement when required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                  internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">5. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to collect information about your browsing activities. 
                  You can control cookies through your browser settings, though disabling cookies may affect your ability 
                  to use certain features of our website.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">6. Your Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your data</li>
                  <li>Objection to processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">7. Children's Privacy</h2>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from 
                  children under 13. If we learn we have collected such information, we will delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  These countries may have data protection laws different from your jurisdiction. We take appropriate 
                  safeguards to ensure your data remains protected.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">10. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                  <br />
                  Email: info@GlobeExtratravel.co
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

export default Privacy;
