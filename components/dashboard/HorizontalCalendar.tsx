"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  format,
  addDays,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendarContext } from "./calender-provider";

const HorizontalCalendar = () => {
  // const today = new Date();
  // const startOfCurrentYear = startOfYear(today);
  // const endOfCurrentYear = endOfYear(today);
  // const days = eachDayOfInterval({
  //   start: startOfCurrentYear,
  //   end: endOfCurrentYear,
  // });
  // const [dayIndex, setDayIndex] = useState(
  //   days.findIndex((day) => isToday(day))
  // );

  const { dayIndex, setDayIndex, days, setSelectedDate } = useCalendarContext();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
      console.log(scrollRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      if (dayIndex !== -1) {
        const todayElement = scrollRef.current.children[
          dayIndex
        ] as HTMLDivElement;
        scrollRef.current.scrollLeft =
          todayElement.offsetLeft -
          scrollRef.current.offsetWidth / 2 +
          todayElement.offsetWidth / 2;
      }
    }
  }, [dayIndex]);

  return (
    <div className="relative overflow-x-auto">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md z-10"
        onClick={() => scroll(-200)}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto py-4 px-8 no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {days.map((day, index) => {
          return (
            <div
              onClick={() => {
                setDayIndex(index);
                setSelectedDate(day);
              }}
              key={index}
              className={`min-w-[100px] py-4 rounded-md text-center shadow-md cursor-pointer ${
                dayIndex === index ? "bg-primary" : "bg-gray-75"
              } ${
                dayIndex === index
                  ? "text-gray-50 dark:text-white"
                  : "text-gray-800"
              }`}
            >
              <div className="text-md font-medium">{format(day, "MMM")}</div>
              <div className="text-lg font-bold">{format(day, "d")}</div>
              <div className="text-sm">{format(day, "E")}</div>
            </div>
          );
        })}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md z-10"
        onClick={() => scroll(200)}
      >
        <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </button>
    </div>
  );
};

export default HorizontalCalendar;
