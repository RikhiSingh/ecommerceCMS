import { Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="container mx-auto py-10 px-4">
                {/* Legal Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Legal Column */}
                    <div className="text-center md:text-left">
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <p className="text-xs text-gray-500 mt-2">
                            Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries.
                            App Store is a service mark of Apple Inc. Android, Google Play and the Google Play logo are trademarks of Google LLC.
                            Terms for Free Delivery (First Order): Offer valid on first order made through Instacart with a minimum basket size as set forth in the offer promotion. Offer expires on the date indicated in the user&apos;s account settings or displayed in the offer promotion.
                        </p>
                        <a href="#" className="text-green-600 text-xs">View more details here.</a>
                    </div>

                    {/* Terms and Privacy Links */}
                    <div className="flex justify-center md:justify-center space-y-2 md:space-y-0 flex-row">
                        <ul className="text-xs text-gray-500 text-center">
                            <li className="inline-block mx-2"><a href="#">Terms of Use</a></li>
                            <li className="inline-block mx-2"><a href="#">Privacy Policy</a></li>
                            <li className="inline-block mx-2"><a href="#">Your Privacy Choices</a></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="text-center md:text-right">
                        <div className="flex justify-center md:justify-end space-x-4">
                            <Link href="#" aria-label="Facebook">
                                <Facebook className="text-gray-500" />
                            </Link>
                            <Link href="#" aria-label="Twitter">
                                <Twitter className="text-gray-500" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="text-gray-500" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="mt-6">
                    <p className="text-center text-xs text-black">
                        &copy; CommunoCart 2024. &nbsp;&nbsp; All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
