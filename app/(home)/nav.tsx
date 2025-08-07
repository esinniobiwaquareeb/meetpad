import { useEffect, useState } from "react";
import ButtonTheme from "@/components/common/button-theme";
import Logo from "@/components/common/logo";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { colorClasses } from "@/lib/colors";

const HomeNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getAuthenticatedUser() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw new Error("User not authenticated");
        if (user) setUserIsAuthenticated(true);
      } catch {
        setUserIsAuthenticated(false);
      }
    }

    getAuthenticatedUser();
  }, [userIsAuthenticated]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 fixed top-0 left-0 right-0 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            How It Works
          </Link>
          <Link href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            Pricing
          </Link>
          <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            Contact
          </Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ButtonTheme />
          {userIsAuthenticated ? (
            <Button asChild className={`rounded-xl ${colorClasses.button.primary}`}>
              <Link href="/dashboard" className="flex items-center gap-2">
                <span>My Account</span>
                <MoveRight size={18} />
              </Link>
            </Button>
          ) : (
            <>
              <Link href="/login">
                <span className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${colorClasses.button.outline}`}>
                  Sign In
                </span>
              </Link>
              <Link href="/sign-up">
                <span className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${colorClasses.button.primary}`}>
                  Get Started
                </span>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ButtonTheme />
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle Menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <IoMdClose className="text-2xl text-gray-700 dark:text-gray-300" />
            ) : (
              <HiOutlineMenuAlt3 className="text-2xl text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <Logo />
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Close Menu"
            onClick={() => setShowMenu(false)}
          >
            <IoMdClose className="text-2xl text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            href="#features"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-3"
            onClick={() => setShowMenu(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-3"
            onClick={() => setShowMenu(false)}
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-3"
            onClick={() => setShowMenu(false)}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-3"
            onClick={() => setShowMenu(false)}
          >
            Contact
          </Link>
          
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            {userIsAuthenticated ? (
              <Button asChild className={`w-full rounded-xl ${colorClasses.button.primary}`}>
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  <span>My Account</span>
                  <MoveRight size={18} />
                </Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="block">
                  <span className={`block w-full px-6 py-3 rounded-xl font-medium text-center transition-all duration-200 ${colorClasses.button.outline}`}>
                    Sign In
                  </span>
                </Link>
                <Link href="/sign-up" className="block">
                  <span className={`block w-full px-6 py-3 rounded-xl font-medium text-center transition-all duration-200 ${colorClasses.button.primary}`}>
                    Get Started
                  </span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HomeNav;
