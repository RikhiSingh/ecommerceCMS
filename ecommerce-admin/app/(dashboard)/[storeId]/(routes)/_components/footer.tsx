import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <div className="border-t bg-gray-900 text-white">
      <Container>
        <footer>
          <div className="container mx-auto py-10 px-4">
            {/* Legal Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Terms and Privacy Links */}
              <div className="flex justify-center md:justify-start space-y-2 md:space-y-0 flex-col md:flex-row">
                {/* Bottom Note */}
                <p className="text-center text-xs md:text-sm">
                  &copy; CommunoCart 2024. &nbsp;&nbsp; All rights reserved.
                </p>
                {/* Optional Terms and Privacy Links */}
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="text-center md:text-right">
                <div className="flex justify-center md:justify-end space-x-6">
                  <Link href="#" aria-label="Facebook">
                    <Facebook className="text-gray-400 hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="text-gray-400 hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="text-gray-400 hover:text-gray-300 transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
