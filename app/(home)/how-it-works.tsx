import { FiUserPlus, FiCalendar, FiVideo, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { colorClasses } from "@/lib/colors";

const HomeHowItWorks = () => {
  const steps = [
    {
      icon: <FiUserPlus className="w-8 h-8" />,
      title: "Create Your Profile",
      description: "Set up your professional profile with your services, availability, and pricing. Add your expertise, credentials, and what makes you unique.",
      benefits: [
        "Customizable profile with your branding",
        "Service categories and pricing tiers",
        "Professional bio and credentials showcase"
      ]
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Share Your Booking Link",
      description: "Get a unique booking link that you can share with clients. They can view your availability and book sessions directly.",
      benefits: [
        "Instant booking link generation",
        "Real-time availability calendar",
        "Automated scheduling with timezone support"
      ]
    },
    {
      icon: <FiVideo className="w-8 h-8" />,
      title: "Host Your Sessions",
      description: "Conduct professional video meetings with built-in tools. Screen sharing, recording, and meeting analytics included.",
      benefits: [
        "HD video quality with noise cancellation",
        "Screen sharing and virtual backgrounds",
        "Meeting recording and transcription"
      ]
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Get Paid Automatically",
      description: "Receive payments instantly after each session. Multiple payment methods supported with automatic invoicing.",
      benefits: [
        "Instant payment processing",
        "Multiple payment method support",
        "Automatic invoice generation"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-6`}>
            <FiArrowRight className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How MeetPad
            <span className="block text-blue-600 dark:text-blue-400">
              works for you
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started in minutes and start booking clients immediately. 
            Our streamlined process makes it easy to focus on what you do best.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 dark:bg-blue-700 transform -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 z-20">
                  {index + 1}
                </div>
                
                {/* Step Content */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colorClasses.primary.bg} ${colorClasses.primary.text} rounded-xl flex items-center justify-center mb-6`}>
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-3">
                    {step.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already transformed their consultation business with MeetPad.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            <FiArrowRight className="mr-2 w-5 h-5" />
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHowItWorks;