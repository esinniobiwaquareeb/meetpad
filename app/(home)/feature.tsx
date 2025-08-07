import { FiCalendar, FiDollarSign, FiVideo, FiUsers, FiShield, FiZap } from "react-icons/fi";
import { colorClasses } from "@/lib/colors";

const HomeFeature = () => {
  const features = [
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "Automated calendar management with intelligent time slot suggestions and conflict detection.",
      benefit: "Save 5+ hours per week on scheduling"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Payment Processing",
      description: "Secure payment collection with support for multiple payment methods and automatic invoicing.",
      benefit: "Get paid instantly, no more chasing payments"
    },
    {
      icon: <FiVideo className="w-8 h-8" />,
      title: "Video Meetings",
      description: "Built-in HD video conferencing with screen sharing, recording, and meeting analytics.",
      benefit: "Professional meetings without external tools"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Client Management",
      description: "Comprehensive client database with communication history and preference tracking.",
      benefit: "Build stronger client relationships"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Security & Privacy",
      description: "Enterprise-grade security with end-to-end encryption and GDPR compliance.",
      benefit: "Your data is always protected"
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Automation",
      description: "Automated reminders, follow-ups, and workflow optimization to streamline operations.",
      benefit: "Focus on what matters most"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Meetings Scheduled" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-6`}>
            <FiZap className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to
            <span className="block text-blue-600 dark:text-blue-400">
              grow your business
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            MeetPad combines all the tools you need in one powerful platform. 
            No more juggling multiple apps or worrying about integrations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className={`w-16 h-16 ${colorClasses.primary.bg} ${colorClasses.primary.text} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                <FiZap className="w-4 h-4 mr-2" />
                {feature.benefit}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-blue-50 dark:bg-gray-800 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Trusted by professionals worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200">
            <FiZap className="mr-2 w-5 h-5" />
            Start Your Free Trial
          </button>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;