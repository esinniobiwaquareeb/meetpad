"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signup } from "./actions";
import Logo from "@/components/common/logo";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { P } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import ButtonSubmit from "@/components/common/button-submit";
import Link from "next/link";
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  usePageTitle('Sign Up');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
            <Heading type="h3" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Create your account
            </Heading>
            <P size="sm" className="text-gray-600 dark:text-gray-400">
              Get started with MeetPad today
            </P>
          </div>
          
          <form action={signup} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Email address
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="Enter your email" 
                required 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="pt-4">
              <ButtonSubmit
                text="Create account"
                showToast={false}
                pendingText="Creating account..."
                showPendingToast={false}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
              />
            </div>
          </form>
          
          <div className="text-center mt-6">
            <P size="sm" className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </P>
          </div>
        </div>
      </div>
      
      <Suspense fallback={null}>
        <MessageHandler />
      </Suspense>
    </div>
  );
}

function MessageHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      toast.error(message);
      router.replace("/sign-up");
    }
  }, [message, router]);

  return null;
}
