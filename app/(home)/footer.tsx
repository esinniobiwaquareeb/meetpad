import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiHeart } from "react-icons/fi";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { colorClasses } from "@/lib/colors";

const HomeFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "API", href: "/api" },
      { name: "Integrations", href: "/integrations" }
    ],
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Status", href: "/status" },
      { name: "Documentation", href: "/docs" },
      { name: "Community", href: "/community" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-use" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Security", href: "/security" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: FiTwitter, href: "https://twitter.com/meetpad" },
    { name: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com/company/meetpad" },
    { name: "GitHub", icon: FiGithub, href: "https://github.com/meetpad" }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              The all-in-one platform that streamlines scheduling, payments, and video meetings. 
              Transform your consultation business with MeetPad.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Stay updated with MeetPad
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get the latest updates, tips, and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center">
              <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                <p className="text-gray-900 dark:text-white">hello@meetpad.app</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiPhone className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                <p className="text-gray-900 dark:text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Office</p>
                <p className="text-gray-900 dark:text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              <span>&copy; {currentYear} MeetPad. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span>Made with</span>
              <FiHeart className="w-4 h-4 text-red-500 mx-1" />
              <span>for professionals</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Version 1.0.0</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-green-500 dark:text-green-400">●</span>
              <span className="text-gray-500 dark:text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
