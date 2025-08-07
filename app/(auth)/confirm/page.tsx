// app/(auth)/confirm/page.tsx
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Logo from "@/components/common/logo";

const VerifyEmailClient = dynamic(() => import("@/components/verify-email-client"), { ssr: false });

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo />
        </div>
        
        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <Heading className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Verify your email address
            </Heading>
            <P size="sm" className="text-gray-600 dark:text-gray-400">
              To start using MeetPad, confirm your email address with the email we sent to you
            </P>
          </div>
          
          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Verifying email address...</p>
              </div>
            }
          >
            <VerifyEmailClient />
          </Suspense>
          
          <div className="mt-8">
            <Button 
              type="button"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Resend email
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <P size="sm" className="text-gray-600 dark:text-gray-400">
              Need help?{" "}
              <Link 
                href="/contact" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Contact customer support
              </Link>
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
