"use client";
import React from "react";
import Image from "next/image";
import HomeFooter from "../(home)/footer";
import HomeNav from "../(home)/nav";
import { FaEnvelope, FaUsers, FaHandshake, FaRocket, FaChartLine, FaCogs } from "react-icons/fa";

export default function AboutUs() {
    return (
        <div className="mx-auto min-h-full w-full overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <HomeNav />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <Image 
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1200&q=80" 
                    alt="About MeetPad - Hero Background" 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute inset-0 z-0"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="relative text-5xl font-bold text-white text-center z-10">
                    About MeetPad
                </h1>
            </section>

            <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 space-y-20 transition-colors duration-300">

                {/* Our Story Section */}
                <section className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <Image 
                            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?fit=crop&w=600&q=80" 
                            alt="MeetPad story - our journey" 
                            width={600} 
                            height={400} 
                            layout="responsive" 
                        />
                    </div>
                    <div className="space-y-4 md:w-1/2">
                        <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200">Our Story</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            At <strong>MeetPad</strong>, we started with a simple idea: to help professionals and clients connect with ease and efficiency. Over the years, we&apos;ve grown from a small startup to a trusted scheduling platform used by thousands worldwide. Our journey has always been powered by a commitment to deliver convenience, simplicity, and innovation. We believe in empowering people to focus on what truly matters, while we handle the rest.
                        </p>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaUsers className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Community</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                We&apos;re building a supportive community, where connections inspire growth, innovation, and collective success.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaHandshake className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Integrity</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Honesty and transparency are at the heart of everything we do. We strive to earn your trust with every interaction.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaRocket className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Our innovative spirit drives us to improve constantly, delivering features that simplify scheduling and online interactions.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaChartLine className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Growth</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Our mission is to help you succeed, supporting your growth with powerful, intuitive tools to reach your goals.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaCogs className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Reliability</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Reliability defines our commitment to providing a seamless experience that you can trust every day.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaHandshake className="text-blue-600 dark:text-blue-400 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Respect</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Respect is the foundation of our interactions, fostering trust and mutual understanding.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section>
                    <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-center">
                            <Image 
                                src="https://via.placeholder.com/96" 
                                alt="Esinniobiwa Quareeb - CEO" 
                                width={96} 
                                height={96} 
                                className="rounded-full mx-auto mb-4" 
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Esinniobiwa Quareeb</h3>
                            <p className="text-gray-500 dark:text-gray-400">CEO & Founder</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-center">
                            <Image 
                                src="https://via.placeholder.com/96" 
                                alt="Olanrewaju Taofeek - CTO" 
                                width={96} 
                                height={96} 
                                className="rounded-full mx-auto mb-4" 
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Olanrewaju Taofeek</h3>
                            <p className="text-gray-500 dark:text-gray-400">CTO</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-center">
                            <Image 
                                src="https://via.placeholder.com/96" 
                                alt="AbdulAzeez Taofeek - Frontend Lead" 
                                width={96} 
                                height={96} 
                                className="rounded-full mx-auto mb-4" 
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">AbdulAzeez Taofeek</h3>
                            <p className="text-gray-500 dark:text-gray-400">Frontend Lead</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="text-center bg-blue-600 dark:bg-blue-700 text-white py-10 rounded-lg shadow-lg transition-all hover:bg-blue-700 dark:hover:bg-blue-800">
                    <h2 className="text-3xl font-semibold">Get in Touch</h2>
                    <p className="text-lg mt-4">
                        Have questions, feedback, or want to collaborate? We&apos;re here for you. Reach out to us!
                    </p>
                    <a href="mailto:contact@meetpad.app" className="inline-flex items-center justify-center mt-6 bg-white dark:bg-gray-900 text-blue-600 dark:text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">
                        <FaEnvelope className="mr-2" />
                        contact@meetpad.app
                    </a>
                </section>

            </div>

            <HomeFooter />
        </div>
    );
}
