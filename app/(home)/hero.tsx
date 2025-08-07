import { FiPlay, FiArrowRight, FiCheck } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { colorClasses } from "@/lib/colors";

const HomeHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-8`}>
              <FiCheck className="w-4 h-4 mr-2" />
              Trusted by 10,000+ professionals
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Transform Your
              <span className="block text-blue-600 dark:text-blue-400">
                Consultation Business
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              The all-in-one platform that streamlines scheduling, payments, and video meetings. 
              <span className="font-semibold text-gray-900 dark:text-white"> Save 10+ hours per week</span> while growing your client base.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start mb-8 space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="font-semibold">Join 10,000+ professionals</div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/sign-up"
                className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 ${colorClasses.button.primary}`}
              >
                Start Free Trial
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${colorClasses.button.outline}`}>
                <FiPlay className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <FiCheck className="w-4 h-4 mr-1 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <FiCheck className="w-4 h-4 mr-1 text-green-500" />
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <FiCheck className="w-4 h-4 mr-1 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Online Consultation</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">$150</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">per session</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today&apos;s Schedule</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">3 meetings</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { time: "9:00 AM", name: "John Smith", status: "Confirmed" },
                      { time: "11:30 AM", name: "Emma Davis", status: "Confirmed" },
                      { time: "2:00 PM", name: "Mike Wilson", status: "Pending" }
                    ].map((meeting, i) => (
                      <div key={i} className="flex items-center justify-between text-sm p-2 rounded-md bg-white dark:bg-gray-800">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{meeting.time}</span>
                        <span className="text-gray-900 dark:text-white font-medium">{meeting.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'Confirmed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">10hr</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved/Week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
