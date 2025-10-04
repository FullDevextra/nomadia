import { Link } from "react-router-dom";
import { Plane, Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-lg">
                <Plane className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">GlobeExtra</div>
                <div className="text-xs opacity-80">Travel Co.</div>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Discover. Work. Wander.
            </p>
            <p className="text-xs opacity-75">
              Personalized travel experiences and remote opportunities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Plan Your Trip
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Remote Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 opacity-75" />
                <a href="mailto:info@GlobeExtratravel.co" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  info@GlobeExtratravel.co
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 opacity-75" />
                <a href="tel:+16309493644" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">
                  +1 (630) 949-3644
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-75 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2025 GlobeExtra Travel Co. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
