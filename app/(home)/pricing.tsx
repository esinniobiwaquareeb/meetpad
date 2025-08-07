"use client";

import { FiCheck, FiStar, FiHelpCircle, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";
import { colorClasses } from "@/lib/colors";

const HomePricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals just getting started",
      features: [
        "Up to 5 consultations per month",
        "Basic video meetings",
        "Email support",
        "Standard integrations",
        "Basic analytics"
      ],
      popular: false,
      color: "gray",
      cta: "Get Started Free"
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing professionals and small practices",
      features: [
        "Unlimited consultations",
        "HD video meetings with recording",
        "Payment processing",
        "Client management",
        "Calendar integrations",
        "Priority support",
        "Custom branding",
        "Advanced analytics"
      ],
      popular: true,
      color: "blue",
      cta: "Start Free Trial"
    },
    {
      name: "Business",
      price: "$79",
      period: "/month",
      description: "For established practices and teams",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Advanced analytics",
        "API access",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations",
        "Priority phone support"
      ],
      popular: false,
      color: "blue",
      cta: "Start Free Trial"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees. You only pay for the plan you choose, and you can start with our free trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment."
    }
  ];

  const colorVariants = {
    gray: "bg-gray-50 dark:bg-gray-800",
    blue: "bg-blue-50 dark:bg-blue-900/20"
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.primary.bg} ${colorClasses.primary.text} text-sm font-medium mb-6`}>
            <FiStar className="w-4 h-4 mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose the plan that
            <span className="block text-blue-600 dark:text-blue-400">
              works for you
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core features 
            with no hidden fees or surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'bg-white dark:bg-gray-800 scale-105' 
                  : colorVariants[plan.color as keyof typeof colorVariants]
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <FiStar className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">30-day</div>
              <div className="text-gray-600 dark:text-gray-400">Money-back guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Customer support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-400">14-day trial</div>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need a custom solution?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We offer enterprise solutions for large organizations with custom integrations, 
              dedicated support, and advanced security features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${colorClasses.button.primary}`}>
                <FiZap className="w-5 h-5 mr-2" />
                Contact Sales
              </button>
              <button className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 ${colorClasses.button.outline}`}>
                <FiShield className="w-5 h-5 mr-2" />
                Security Overview
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Have more questions? <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-1">Contact our support team</a>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-start">
                  <FiHelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
