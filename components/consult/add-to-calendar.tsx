import { useState } from "react";
import Link from "next/link";
import { generateGoogleCalendarLink, generateOutlookCalendarLink, generateAppleCalendarLink, generateICalLink, generateYahooCalendarLink } from "@/lib/calendar-links";
import { CiCalendar } from "react-icons/ci";
import { Button } from "../ui/button";
const AddToCalendarDropdown = ({ event }: { event: any }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} className="bg-blue-600 text-white">
        <CiCalendar size={20} />
        Add To Calendar
        </Button>
      {dropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
          <ul className="py-1">
            <li className="flex items-center text-center gap-2">
              <Link href={generateGoogleCalendarLink(event)} target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Google</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={generateOutlookCalendarLink(event)} target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Outlook</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={generateAppleCalendarLink(event)} target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Apple</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={generateICalLink(event)} target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">iCal</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={generateYahooCalendarLink(event)} target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Yahoo</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddToCalendarDropdown;
