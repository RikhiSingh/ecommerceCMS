import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <div className="border-t bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-20">
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
              </div>

              {/* Social Media Icons */}
              <div className="text-center md:text-right">
                <div className="flex justify-center md:justify-end space-x-6">
                  <Link href="#" aria-label="Facebook">
                    <Facebook className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors" />
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
