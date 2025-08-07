import { FiStar } from "react-icons/fi";
import { colorClasses } from "@/lib/colors";

const HomeTestimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Psychologist",
      company: "Mindful Therapy Group",
      content: "MeetPad has transformed my practice. I've increased my client base by 60% and saved over 12 hours per week on administrative tasks. The platform is incredibly intuitive and my clients love the seamless booking experience.",
      rating: 5,
      avatar: "SJ",
      industry: "Healthcare"
    },
    {
      name: "Michael Chen",
      role: "Business Consultant",
      company: "Chen Consulting",
      content: "As a business consultant, I needed a professional platform that could handle everything from scheduling to payments. MeetPad exceeded my expectations. My revenue increased by 45% in the first quarter.",
      rating: 5,
      avatar: "MC",
      industry: "Business"
    },
    {
      name: "Emily Rodriguez",
      role: "Legal Advisor",
      company: "Rodriguez Law",
      content: "The video quality and security features are outstanding. My clients feel confident knowing their consultations are private and secure. MeetPad has made remote legal consultations seamless and professional.",
      rating: 5,
      avatar: "ER",
      industry: "Legal"
    },
    {
      name: "David Thompson",
      role: "Financial Advisor",
      company: "Thompson Wealth Management",
      content: "I've tried many platforms, but MeetPad is by far the best. The payment processing is smooth, and the analytics help me understand my business better. Highly recommended for any professional service.",
      rating: 5,
      avatar: "DT",
      industry: "Finance"
    },
    {
      name: "Lisa Wang",
      role: "Career Coach",
      company: "Career Success Coaching",
      content: "MeetPad has been a game-changer for my coaching business. The automated scheduling and reminder system has reduced no-shows by 80%. My clients appreciate the professional experience.",
      rating: 5,
      avatar: "LW",
      industry: "Education"
    },
    {
      name: "Robert Martinez",
      role: "IT Consultant",
      company: "Tech Solutions Pro",
      content: "The platform's reliability and ease of use are exceptional. I can focus on delivering value to my clients instead of managing technical issues. MeetPad has streamlined my entire consultation process.",
      rating: 5,
      avatar: "RM",
      industry: "Technology"
    }
  ];

  const stats = [
    { number: "98%", label: "Customer Satisfaction" },
    { number: "15hr", label: "Time Saved Per Week" },
    { number: "40%", label: "Revenue Increase" },
    { number: "10,000+", label: "Active Professionals" }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-6`}>
            <FiStar className="w-4 h-4 mr-2" />
            Customer Success
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by professionals
            <span className="block text-blue-600 dark:text-blue-400">
              worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their consultation business with MeetPad. 
            See what our customers have to say about their experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <FiStar className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-20" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Industry Badge */}
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                  {testimonial.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to join thousands of successful professionals?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your free trial today and see why professionals choose MeetPad for their consultation business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 ${colorClasses.button.primary}`}>
                Start Free Trial
              </button>
              <button className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${colorClasses.button.outline}`}>
                View More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials; 