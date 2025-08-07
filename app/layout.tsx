import type { Metadata } from "next";
import Head from "next/head";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Toaster as ActionToaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeetPad - The Complete Platform for Professional Online Consultations",
  description:
    "MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%. Start your free trial today.",
  keywords: [
    "online consultation platform",
    "video consultation software",
    "professional consultation tools",
    "consultation scheduling",
    "video meeting platform",
    "consultation business software",
    "online meeting platform",
    "consultation management system",
    "video call platform",
    "consultation booking system",
    "professional consultation services",
    "consultation scheduling software",
    "online consultation tools",
    "video consultation platform",
    "consultation management platform"
  ].join(", "),
  authors: [{ name: "MeetPad Team" }],
  creator: "MeetPad",
  publisher: "MeetPad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://meetpad.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://meetpad.app",
    title: "MeetPad - The Complete Platform for Professional Online Consultations",
    description:
      "MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%.",
    siteName: "MeetPad",
    images: [
      {
        url: "https://meetpad.app/seo.png",
        width: 1200,
        height: 630,
        alt: "MeetPad - Professional Online Consultation Platform",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetPad - The Complete Platform for Professional Online Consultations",
    description:
      "MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%.",
    images: ["https://meetpad.app/seo.png"],
    creator: "@meetpad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>
          MeetPad - The Complete Platform for Professional Online Consultations
        </title>
        <meta
          name="description"
          content="MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%. Start your free trial today."
        />
        <meta
          name="keywords"
          content="online consultation platform, video consultation software, professional consultation tools, consultation scheduling, video meeting platform, consultation business software, online meeting platform, consultation management system, video call platform, consultation booking system, professional consultation services, consultation scheduling software, online consultation tools, video consultation platform, consultation management platform"
        />
        <meta name="author" content="MeetPad Team" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://meetpad.app" />
        
        {/* Open Graph */}
        <meta
          property="og:title"
          content="MeetPad - The Complete Platform for Professional Online Consultations"
        />
        <meta
          property="og:site_name"
          content="MeetPad"
        />
        <meta
          property="og:description"
          content="MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%."
        />
        <meta
          property="og:image"
          content="https://meetpad.app/seo.png"
        />
        <meta property="og:url" content="https://meetpad.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MeetPad - The Complete Platform for Professional Online Consultations" />
        <meta name="twitter:description" content="MeetPad is the #1 platform for online consultations. Streamline scheduling, payments, and video meetings. Save 15+ hours per week while increasing revenue by 40%." />
        <meta name="twitter:image" content="https://meetpad.app/seo.png" />
        <meta name="twitter:creator" content="@meetpad" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MeetPad",
              "description": "The complete platform for professional online consultations. Streamline scheduling, payments, and video meetings.",
              "url": "https://meetpad.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1000"
              },
              "provider": {
                "@type": "Organization",
                "name": "MeetPad",
                "url": "https://meetpad.app"
              }
            })
          }}
        />
      </Head>

      <body
        className={`${poppins.className} antialiased relative overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ActionToaster />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
