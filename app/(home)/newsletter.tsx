import { FiMail, FiGift, FiArrowRight, FiCheck } from "react-icons/fi";
import { colorClasses } from "@/lib/colors";

const HomeNewsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-6`}>
            <FiGift className="w-4 h-4 mr-2" />
            Exclusive Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Get Your Free Consultation Guide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join 5,000+ professionals who have already downloaded our comprehensive guide to 
            <span className="font-semibold text-gray-900 dark:text-white"> scaling their consultation business</span>.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Proven Strategies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              15 proven strategies used by top consultants to increase revenue
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Client Templates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ready-to-use email templates and scripts for client communication
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pricing Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete pricing strategy guide to maximize your consultation fees
            </p>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <FiMail className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Download Your Free Guide
            </h3>
          </div>
          
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            
            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 ${colorClasses.button.primary}`}
            >
              <FiArrowRight className="w-5 h-5 mr-2" />
              Get Free Guide Now
            </button>
          </form>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            🔒 We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-12">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Trusted by professionals from:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Healthcare</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Legal</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Finance</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Education</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Technology</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletter;
