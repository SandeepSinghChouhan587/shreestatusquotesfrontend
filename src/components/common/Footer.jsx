import { Heart, Instagram, Share2, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Shree Status Quotes
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              A platform for motivational, emotional, and meaningful quotes crafted
              to inspire and uplift your daily life.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2 text-white/80">
            <h3 className="font-semibold text-white mb-2">Quick Links</h3>
            <Link to="/" className="hover:text-pink-300 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-pink-300 transition-colors">
              About
            </Link>
            <Link to="/category" className="hover:text-pink-300 transition-colors">
              Categories
            </Link>
            <Link to="/contact" className="hover:text-pink-300 transition-colors">
              Contact
            </Link>
            <Link to="/terms" className="hover:text-pink-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>

          {/* Social + Info */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-white mb-2">Connect With Us</h3>

            <div className="flex gap-4">
              support@shreestatusquotes.com
            </div>

            <p className="text-white/70 text-sm">
              Made with <Heart size={14} className="inline text-red-400" /> in India
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/20" />

        {/* Disclaimer */}
        <div className="text-center text-white/70 text-sm leading-relaxed max-w-4xl mx-auto">
          <p>
            Disclaimer: All images used on this website are AI-generated and are
            intended for creative and illustrative purposes only. These images do
            not represent any real person or entity. Any resemblance is purely
            coincidental.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm gap-2">
          <p>© {new Date().getFullYear()} Shree Status Quotes. All rights reserved.</p>
          <p>Designed & Maintained by Shree Status Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
