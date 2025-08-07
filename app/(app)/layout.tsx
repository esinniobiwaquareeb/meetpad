import Aside from "@/components/dashboard/Aside";
import Header from "@/components/dashboard/Header";
import { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s | MeetPad",
    default: "Dashboard",
  },
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[240px_1fr] md:grid-rows-[auto_1fr] md:h-screen">
      <Header />
      <Aside />
      <main className="md:col-[auto] col-span-2 md:p-6 p-3 bg-gray-100 pt-24 sm:pt-6 overflow-x-hidden  overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
