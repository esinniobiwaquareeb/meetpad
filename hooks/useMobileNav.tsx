"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface MobileContent_Interface {
  toggleNav?: any;
  isNavOpen: boolean;
}

const MobileContext = createContext({} as MobileContent_Interface);

function MobileProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((open) => !open);

  return (
    <MobileContext.Provider value={{ isNavOpen, toggleNav }}>
      {children}
    </MobileContext.Provider>
  );
}

function useMobile() {
  const context = useContext(MobileContext);

  if (!context) throw new Error("Mobile content used out of Mobile provider");

  return context;
}

export { MobileProvider, useMobile };
