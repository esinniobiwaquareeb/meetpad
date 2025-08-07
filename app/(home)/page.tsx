"use client";
import React, { useState } from "react";
import HomeFooter from "./footer";
import HomeContactUs from "./contact";
import HomeFeature from "./feature";
import HomeNav from "./nav";
import HomeHero from "./hero";
import HomeHowItWorks from "./how-it-works";
import HomePricing from "./pricing";
import HomeNewsletter from "./newsletter";
import HomeTestimonials from "./testimonials";

export default function Home() {
  return (
    <div className="mx-auto min-h-full w-full overflow-auto bg-white dark:bg-gray-900 transition-colors duration-300">
      <HomeNav />

      <HomeHero />

      <HomeFeature />

      <HomeTestimonials />

      <HomeHowItWorks />

      <HomePricing />

      <HomeNewsletter />

      <HomeContactUs />

      <HomeFooter />
    </div>
  );
}
