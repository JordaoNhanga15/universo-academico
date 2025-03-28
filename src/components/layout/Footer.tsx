
import { Link } from "react-router-dom";
import SubscriptionForm from "@/components/shared/SubscriptionForm";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-academia-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif font-bold mb-4">Universo Academia</h3>
            <p className="text-academia-100 mb-6">
              Your source for the latest academic research, educational news, and scholarly discussions from around the world.
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
              <SubscriptionForm />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-academia-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-academia-100 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-academia-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-academia-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-academia-100 hover:text-white" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-academia-100 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-academia-100 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:info@universoacademia.com" className="text-academia-100 hover:text-white" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-4">Contact</h4>
              <address className="not-italic text-academia-100">
                1234 Academic Way<br />
                Research Park, CA 94305<br />
                contact@universoacademia.com
              </address>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-academia-500 text-academia-100 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Universo Academia. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
