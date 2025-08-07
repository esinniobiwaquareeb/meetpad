"use client";
import React, { useState, useEffect } from "react";
import HomeFooter from "../(home)/footer";
import HomeNav from "../(home)/nav";
import CategorySection from "./CategorySection";
import { FaSearch, FaArrowUp } from "react-icons/fa";

const knowledgeBaseData = {
    "Getting Started": [
        { title: "How to Sign Up", content: "To sign up, go to the home page and click on 'Sign Up'..." },
        { title: "Account Setup Guide", content: "After signing up, complete your profile by uploading a picture..." },
        { title: "Navigating the Dashboard", content: "Your dashboard is the hub of your activities; learn to navigate..." }
    ],
    "Account Management": [
        { title: "How to Reset Your Password", content: "To reset your password, go to the login page and click..." },
        { title: "Managing Your Profile", content: "Update your profile details anytime by visiting account settings..." },
        { title: "Two-Factor Authentication", content: "Enable two-factor authentication for added security..." }
    ],
    "Scheduling and Appointments": [
        { title: "How to Schedule a Meeting", content: "To schedule a meeting, go to your dashboard and click 'Schedule'..." },
        { title: "Setting Your Availability", content: "Configure your availability to make scheduling seamless..." },
        { title: "Managing Appointments", content: "Access and update your scheduled appointments from the 'Appointments' tab..." }
    ],
    "Video Conferencing": [
        { title: "Using the Built-In Video Call", content: "Our platform provides a built-in video solution in your browser..." },
        { title: "Video Call Troubleshooting", content: "If you experience issues, ensure your browser has permissions..." },
        { title: "Sharing Your Screen", content: "Easily share your screen during video calls by clicking 'Share'..." }
    ],
    "Billing and Payments": [
        { title: "Subscription Plans", content: "We offer various subscription plans. Choose a plan that fits you best..." },
        { title: "Updating Payment Information", content: "To update payment details, visit the 'Billing' section in settings..." },
        { title: "Invoice and Billing History", content: "Access your billing history and download invoices for records..." }
    ],
};

export default function KnowledgeBase() {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [showTopButton, setShowTopButton] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const filteredData = Object.fromEntries(
        Object.entries(knowledgeBaseData).map(([category, articles]) => [
            category,
            articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.content.toLowerCase().includes(searchTerm)
            ),
        ])
    );

    // Show "Back to Top" button when scrolled down
    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative mx-auto min-h-full w-full overflow-auto bg-gray-100">
            <HomeNav />

            <div className="min-h-screen flex flex-col px-8 md:px-16 py-12 bg-white shadow-lg mx-auto max-w-6xl my-8 rounded-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-8">Knowledge Base</h1>

                <div className="relative mb-10">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-4 text-lg border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <FaSearch className="absolute right-4 top-4 text-gray-500" />
                </div>

                {Object.entries(filteredData).map(([category, articles]) => (
                    <CategorySection
                        key={category}
                        category={category}
                        articles={articles}
                        isExpanded={expandedCategory === category}
                        toggleCategory={() => toggleCategory(category)}
                    />
                ))}

                {showTopButton && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-10 right-10 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        <FaArrowUp />
                    </button>
                )}

            </div>
            <hr className="my-8 border-gray-200 sm:mx-auto lg:my-8" />
            <HomeFooter />
        </div>
    );
}
